"use server";

import { randomBytes } from "node:crypto";
import { z } from "zod";
import { ehChoqueDeAgenda, escolherSala, vagasNoPeriodo, type Vaga } from "@/lib/agenda";
import { db } from "@/lib/db";
import { reais, soDigitos } from "@/lib/formato";
import { dentroDoLimite, ipDoPedido } from "@/lib/limite";
import { enfileirar, preencher } from "@/lib/mensagens";
import { dataLocal, dataValida, fmtDataLonga, fmtHora } from "@/lib/tempo";

const DIAS_A_FRENTE = 21;
const VERSAO_CONSENTIMENTO = "2026-11";

/** Quantas vagas há em cada um dos próximos dias. */
export async function consultarDias(servicoId: string, profissionalId: string | null) {
  const vagas = await vagasNoPeriodo({ servicoId, profissionalId, de: dataLocal(), dias: DIAS_A_FRENTE });
  return Object.entries(vagas).map(([data, lista]) => ({ data, vagas: lista.length }));
}

/** Horários livres de um dia. Consultado na hora, sem cache. */
export async function consultarHorarios(servicoId: string, profissionalId: string | null, data: string): Promise<Vaga[]> {
  if (!dataValida(data)) return [];
  const vagas = await vagasNoPeriodo({ servicoId, profissionalId, de: data, dias: 1 });
  return vagas[data] ?? [];
}

const Pedido = z.object({
  servicoId: z.string().min(1),
  profissionalId: z.string().min(1),
  inicio: z.iso.datetime(),
  nome: z.string().trim().min(3, "Informe seu nome completo.").max(120),
  telefone: z
    .string()
    .transform(soDigitos)
    .refine((d) => d.length === 10 || d.length === 11, "Informe o telefone com DDD."),
  email: z.union([z.literal(""), z.email("E-mail inválido.")]).optional(),
  petNome: z.string().trim().min(1, "Informe o nome do pet.").max(60),
  especieId: z.string().min(1, "Escolha a espécie."),
  observacoes: z.string().trim().max(500).optional(),
  consentimento: z.literal(true, { error: "É preciso aceitar para agendar." }),
  site: z.string().max(0).optional(),
});

export type RespostaAgendar =
  | { ok: true; resumo: { servico: string; profissional: string; quando: string; hora: string; pet: string; valor: string } }
  | { ok: false; erro: string; campos?: Record<string, string>; horarioPerdido?: boolean };

export async function agendar(bruto: unknown): Promise<RespostaAgendar> {
  const lido = Pedido.safeParse(bruto);
  if (!lido.success) {
    const campos: Record<string, string> = {};
    for (const i of lido.error.issues) campos[String(i.path[0])] ??= i.message;
    return { ok: false, erro: "Confira os campos marcados.", campos };
  }
  const p = lido.data;
  if (!(await dentroDoLimite("agendar", 6, 10 * 60_000))) {
    return { ok: false, erro: "Muitos pedidos em pouco tempo. Tente de novo em alguns minutos ou ligue para a clínica." };
  }

  const inicio = new Date(p.inicio);
  const data = dataLocal(inicio);
  const servico = await db.servico.findFirst({ where: { id: p.servicoId, ativo: true, agendavelOnline: true } });
  const especie = await db.especie.findUnique({ where: { id: p.especieId } });
  if (!servico || !especie) return { ok: false, erro: "Serviço indisponível para agendamento online." };

  // Confere de novo: o horário precisa continuar livre para este profissional.
  const livres = (await vagasNoPeriodo({ servicoId: servico.id, profissionalId: p.profissionalId, de: data, dias: 1 }))[data] ?? [];
  const vaga = livres.find((v) => v.inicio === inicio.toISOString());
  if (!vaga) return { ok: false, erro: "Esse horário acabou de ser ocupado. Escolha outro.", horarioPerdido: true };

  const fim = new Date(inicio.getTime() + servico.duracaoMin * 60_000);
  const salaId = await escolherSala(servico.tipoSala, inicio, fim);
  if (servico.tipoSala && !salaId) return { ok: false, erro: "Esse horário acabou de ser ocupado. Escolha outro.", horarioPerdido: true };

  const unidade = await db.unidade.findFirstOrThrow({ where: { ativa: true }, orderBy: { nome: "asc" } });
  const ip = await ipDoPedido();
  const quando = fmtDataLonga(inicio);
  const hora = fmtHora(inicio);

  try {
    await db.$transaction(async (tx) => {
      let tutor = await tx.tutor.findFirst({ where: { telefone: p.telefone, anonimizadoEm: null } });
      if (!tutor) {
        tutor = await tx.tutor.create({ data: { nome: p.nome, telefone: p.telefone, whatsapp: p.telefone, email: p.email || null } });
      }
      let pet = await tx.pet.findFirst({ where: { tutorId: tutor.id, ativo: true, nome: { equals: p.petNome, mode: "insensitive" } } });
      if (!pet) pet = await tx.pet.create({ data: { tutorId: tutor.id, nome: p.petNome, especieId: especie.id } });

      const ag = await tx.agendamento.create({
        data: {
          unidadeId: unidade.id,
          petId: pet.id,
          tutorId: tutor.id,
          servicoId: servico.id,
          profissionalId: p.profissionalId,
          salaId,
          inicio,
          fim,
          origem: "SITE",
          observacoes: p.observacoes || null,
        },
      });
      await tx.consentimento.create({
        data: { tutorId: tutor.id, tipo: "TRATAMENTO_DADOS", concedido: true, versaoTexto: VERSAO_CONSENTIMENTO, origem: "site/agendar", ip },
      });
      await tx.confirmacaoPresenca.create({ data: { agendamentoId: ag.id, token: randomBytes(24).toString("base64url") } });

      const modelo = await tx.modeloMensagem.findUnique({ where: { chave: "agendamento_confirmado" } });
      if (modelo?.ativo) {
        await enfileirar(tx, {
          canal: "WHATSAPP",
          destino: "55" + p.telefone,
          tutorId: tutor.id,
          agendamentoId: ag.id,
          chaveUnica: `agendamento:${ag.id}:recebido`,
          corpo: preencher(modelo.corpo, { tutor: tutor.nome.split(" ")[0], pet: pet.nome, servico: servico.nome, data: quando, hora }),
        });
      }
      await tx.logAuditoria.create({
        data: { acao: "agendamento.criado_pelo_site", entidade: "Agendamento", entidadeId: ag.id, unidadeId: unidade.id, ip, depois: { servico: servico.nome, inicio: p.inicio } },
      });
    });
  } catch (e) {
    if (ehChoqueDeAgenda(e)) return { ok: false, erro: "Esse horário acabou de ser ocupado. Escolha outro.", horarioPerdido: true };
    console.error("Falha ao agendar pelo site", e);
    return { ok: false, erro: "Não foi possível concluir o agendamento. Tente de novo ou ligue para a clínica." };
  }

  return { ok: true, resumo: { servico: servico.nome, profissional: vaga.profissional, quando, hora, pet: p.petNome, valor: reais(servico.precoCentavos) } };
}
