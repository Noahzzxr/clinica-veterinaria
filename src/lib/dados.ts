// Leituras do site público. Tudo aqui é cacheado e etiquetado: quando a equipe edita
// um serviço, um post ou os dados da clínica no sistema, a etiqueta é invalidada.
import { cacheLife, cacheTag } from "next/cache";
import { db } from "./db";
import type { HorarioDia } from "./formato";

export async function obterClinica() {
  "use cache";
  cacheLife("hours");
  cacheTag("clinica");
  const clinica = await db.clinica.findFirstOrThrow({
    include: { unidades: { where: { ativa: true }, orderBy: { nome: "asc" } } },
  });
  const unidade = clinica.unidades[0];
  const exemplo = await db.configuracao.findUnique({ where: { chave: "dadosDeExemplo" } });
  return {
    ...clinica,
    unidade: { ...unidade, horarios: unidade.horarios as unknown as HorarioDia[] },
    dadosDeExemplo: exemplo?.valor === true,
  };
}

export async function listarServicos() {
  "use cache";
  cacheLife("hours");
  cacheTag("servicos");
  return db.servico.findMany({
    where: { ativo: true, exibirNoSite: true },
    orderBy: [{ ordem: "asc" }, { nome: "asc" }],
  });
}

export async function obterServico(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("servicos");
  return db.servico.findFirst({
    where: { slug, ativo: true, exibirNoSite: true },
    include: {
      profissionais: {
        where: { usuario: { ativo: true, exibirNoSite: true } },
        select: { usuario: { select: { nome: true, slug: true, crmv: true, especialidades: true } } },
      },
    },
  });
}

const camposEquipe = {
  id: true,
  nome: true,
  slug: true,
  crmv: true,
  especialidades: true,
  bio: true,
  fotoUrl: true,
} as const;

export async function listarEquipe() {
  "use cache";
  cacheLife("hours");
  cacheTag("equipe");
  return db.usuario.findMany({
    where: { ativo: true, exibirNoSite: true },
    select: camposEquipe,
    orderBy: { nome: "asc" },
  });
}

export async function obterProfissional(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("equipe", "servicos");
  const u = await db.usuario.findFirst({ where: { slug, ativo: true, exibirNoSite: true }, select: camposEquipe });
  if (!u) return null;
  const servicos = await db.servico.findMany({
    where: { ativo: true, exibirNoSite: true, profissionais: { some: { usuarioId: u.id } } },
    orderBy: { ordem: "asc" },
    select: { nome: true, slug: true, agendavelOnline: true },
  });
  return { ...u, servicos };
}

export async function listarDepoimentos() {
  "use cache";
  cacheLife("hours");
  cacheTag("depoimentos");
  return db.depoimento.findMany({ where: { aprovado: true }, orderBy: [{ ordem: "asc" }, { criadoEm: "desc" }] });
}

export async function listarPosts(limite?: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return db.post.findMany({
    where: { publicadoEm: { not: null } },
    orderBy: { publicadoEm: "desc" },
    take: limite,
    select: { slug: true, titulo: true, resumo: true, tags: true, publicadoEm: true, autor: { select: { nome: true } } },
  });
}

export async function obterPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return db.post.findFirst({
    where: { slug, publicadoEm: { not: null } },
    include: { autor: { select: { nome: true, slug: true, crmv: true } } },
  });
}

export async function listarAmbientes() {
  "use cache";
  cacheLife("hours");
  cacheTag("ambientes");
  return db.ambiente.findMany({ orderBy: { ordem: "asc" } });
}

/** Protocolos vacinais com as doses em ordem, para a linha do tempo do site. */
export async function listarProtocolos() {
  "use cache";
  cacheLife("hours");
  cacheTag("protocolos");
  return db.protocoloVacinal.findMany({
    where: { ativo: true, tipo: "VACINA" },
    include: { doses: { orderBy: { ordem: "asc" } }, especie: true },
    orderBy: [{ especie: { nome: "asc" } }, { nome: "asc" }],
  });
}
