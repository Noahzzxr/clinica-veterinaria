// Disponibilidade da agenda. A mesma conta serve ao site, ao portal e à recepção.
// A palavra final é do banco: a restrição de exclusão recusa choque mesmo que duas pessoas
// confirmem o mesmo horário no mesmo instante.
import type { TipoSala } from "@prisma/client";
import { db } from "./db";
import { diaDaSemana, horaDeMinutos, instante, somarDias } from "./tempo";

export type Vaga = { inicio: string; hora: string; profissionalId: string; profissional: string };

/** Antecedência mínima para agendar pelo site. */
const ANTECEDENCIA_MIN = 60;
const FORA = ["CANCELADO", "FALTOU"] as const;

const choca = (a0: Date, a1: Date, b0: Date, b1: Date) => a0 < b1 && b0 < a1;

type Ocupado = { profissionalId: string | null; salaId: string | null; inicio: Date; fim: Date };
type Bloq = { usuarioId: string | null; salaId: string | null; inicio: Date; fim: Date };

function salaLivre(salas: { id: string }[], ocupados: Ocupado[], bloqueios: Bloq[], ini: Date, fim: Date) {
  return salas.find(
    (s) =>
      !ocupados.some((o) => o.salaId === s.id && choca(ini, fim, o.inicio, o.fim)) &&
      !bloqueios.some((b) => b.salaId === s.id && choca(ini, fim, b.inicio, b.fim)),
  );
}

async function ocupacao(de: Date, ate: Date, tipoSala: TipoSala | null) {
  const [ocupados, bloqueios, salas] = await Promise.all([
    db.agendamento.findMany({
      where: { inicio: { lt: ate }, fim: { gt: de }, status: { notIn: [...FORA] }, encaixe: false },
      select: { profissionalId: true, salaId: true, inicio: true, fim: true },
    }),
    db.bloqueio.findMany({ where: { inicio: { lt: ate }, fim: { gt: de } }, select: { usuarioId: true, salaId: true, inicio: true, fim: true } }),
    tipoSala ? db.sala.findMany({ where: { tipo: tipoSala, ativa: true }, select: { id: true }, orderBy: { sigla: "asc" } }) : Promise.resolve([]),
  ]);
  return { ocupados, bloqueios, salas };
}

/** Horários livres de um serviço, dia a dia, a partir de `de` (AAAA-MM-DD). */
export async function vagasNoPeriodo(p: { servicoId: string; profissionalId?: string | null; de: string; dias: number }) {
  const servico = await db.servico.findFirst({
    where: { id: p.servicoId, ativo: true, agendavelOnline: true },
    include: { profissionais: { select: { usuario: { select: { id: true, nome: true, ativo: true } } } } },
  });
  const resultado: Record<string, Vaga[]> = {};
  if (!servico) return resultado;
  let profs = servico.profissionais.map((x) => x.usuario).filter((u) => u.ativo);
  if (p.profissionalId) profs = profs.filter((u) => u.id === p.profissionalId);
  if (!profs.length) return resultado;

  const inicioPeriodo = instante(p.de, 0);
  const fimPeriodo = instante(somarDias(p.de, p.dias), 0);
  const [turnos, { ocupados, bloqueios, salas }] = await Promise.all([
    db.horarioTrabalho.findMany({ where: { usuarioId: { in: profs.map((u) => u.id) } } }),
    ocupacao(inicioPeriodo, fimPeriodo, servico.tipoSala),
  ]);

  const limite = Date.now() + ANTECEDENCIA_MIN * 60_000;
  const passo = servico.duracaoMin <= 15 ? 15 : 30;

  for (let i = 0; i < p.dias; i++) {
    const data = somarDias(p.de, i);
    const semana = diaDaSemana(data);
    const porMinuto = new Map<number, Vaga>();
    for (const prof of profs) {
      for (const t of turnos) {
        if (t.usuarioId !== prof.id || t.diaSemana !== semana) continue;
        for (let m = t.inicioMin; m + servico.duracaoMin <= t.fimMin; m += passo) {
          if (porMinuto.has(m)) continue;
          const ini = instante(data, m);
          const fim = instante(data, m + servico.duracaoMin);
          if (ini.getTime() < limite) continue;
          if (ocupados.some((o) => o.profissionalId === prof.id && choca(ini, fim, o.inicio, o.fim))) continue;
          if (bloqueios.some((b) => (b.usuarioId === prof.id || (!b.usuarioId && !b.salaId)) && choca(ini, fim, b.inicio, b.fim))) continue;
          if (servico.tipoSala && !salaLivre(salas, ocupados, bloqueios, ini, fim)) continue;
          porMinuto.set(m, { inicio: ini.toISOString(), hora: horaDeMinutos(m), profissionalId: prof.id, profissional: prof.nome });
        }
      }
    }
    resultado[data] = [...porMinuto.entries()].sort((a, b) => a[0] - b[0]).map(([, vaga]) => vaga);
  }
  return resultado;
}

/** Escolhe uma sala livre do tipo pedido para o intervalo. Nulo se o serviço não usa sala. */
export async function escolherSala(tipoSala: TipoSala | null, ini: Date, fim: Date) {
  if (!tipoSala) return null;
  const { ocupados, bloqueios, salas } = await ocupacao(ini, fim, tipoSala);
  return salaLivre(salas, ocupados, bloqueios, ini, fim)?.id ?? null;
}

/** Verdadeiro quando o erro veio da restrição de agenda sem choque. */
export function ehChoqueDeAgenda(e: unknown) {
  const texto = String((e as { message?: string })?.message ?? e);
  return texto.includes("sem_choque") || texto.includes("23P01");
}
