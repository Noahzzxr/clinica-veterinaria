import type { Metadata } from "next";
import { Suspense } from "react";
import Agendador from "@/components/agendar/Agendador";
import Ficha from "@/components/site/Ficha";
import { db } from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Agendar online",
  description: "Escolha o serviço, o profissional, o dia e o horário. A agenda mostra só o que está livre agora.",
  alternates: { canonical: "/agendar" },
};

async function opcoes() {
  "use cache";
  cacheLife("hours");
  cacheTag("servicos", "equipe");
  const [servicos, especies] = await Promise.all([
    db.servico.findMany({
      where: { ativo: true, agendavelOnline: true, profissionais: { some: { usuario: { ativo: true } } } },
      orderBy: { ordem: "asc" },
      select: {
        id: true,
        slug: true,
        nome: true,
        descricao: true,
        duracaoMin: true,
        precoCentavos: true,
        profissionais: { where: { usuario: { ativo: true } }, select: { usuario: { select: { id: true, slug: true, nome: true } } } },
      },
    }),
    db.especie.findMany({ orderBy: { nome: "asc" } }),
  ]);
  return { servicos: servicos.map((s) => ({ ...s, profissionais: s.profissionais.map((p) => p.usuario) })), especies };
}

async function Conteudo({ searchParams }: { searchParams: Promise<{ servico?: string; com?: string }> }) {
  const [{ servico, com }, { servicos, especies }] = await Promise.all([searchParams, opcoes()]);
  return <Agendador servicos={servicos} especies={especies} servicoInicial={servico} profissionalInicial={com} />;
}

export default function Agendar(props: { searchParams: Promise<{ servico?: string; com?: string }> }) {
  return (
    <Ficha>
      <main className="dentro pb-28 pt-8 lg:pt-12">
        <p className="rotulo">Agendamento online</p>
        <h1 className="letreiro titulo-pagina mt-3">Agendar</h1>
        <p className="medida mb-12 mt-6 text-xl">Cinco campos. A agenda mostra só o que está livre agora e segura o horário quando você confirma.</p>
        <Suspense fallback={<p className="mono">Abrindo a agenda…</p>}>
          <Conteudo {...props} />
        </Suspense>
      </main>
    </Ficha>
  );
}
