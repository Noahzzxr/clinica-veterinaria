import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Elo from "@/components/site/Elo";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarEquipe, obterProfissional } from "@/lib/dados";

type Props = { params: Promise<{ slug: string }> };

// A rota espera o dado antes de responder: assim um endereço que não existe devolve 404 de verdade.
// As páginas conhecidas são geradas de antemão por generateStaticParams e o dado é cacheado.
export const instant = false;

export async function generateStaticParams() {
  return (await listarEquipe()).flatMap((p) => (p.slug ? [{ slug: p.slug }] : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await obterProfissional((await params).slug);
  if (!p) return {};
  return {
    title: p.nome,
    description: `${p.nome}, ${p.especialidades.join(", ").toLowerCase()}. ${p.bio ?? ""}`.trim(),
    alternates: { canonical: `/equipe/${p.slug}` },
  };
}

async function Conteudo({ params }: Props) {
  const p = await obterProfissional((await params).slug);
  if (!p) notFound();
  const agendaveis = p.servicos.filter((s) => s.agendavelOnline);
  return (
    <main>
      <Topo
        rotulo={
          <Elo href="/equipe" volta className="traco">
            ← Equipe
          </Elo>
        }
        titulo={p.nome}
        pose="olhandoCima"
      >
        <p className="mono text-base">{p.crmv}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.especialidades.map((e) => (
            <li key={e} className="selo selo-cheio !text-[12px]">
              {e}
            </li>
          ))}
        </ul>
        {p.bio && <p className="mt-6">{p.bio}</p>}
      </Topo>
      <section aria-labelledby="t-atende" className="dentro pb-28">
        <h2 id="t-atende" className="rotulo border-b-2 border-focinho pb-2 lg:mr-[17%]">
          Atende
        </h2>
        <ul className="lg:mr-[17%]">
          {p.servicos.map((s) => (
            <li key={s.slug} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-regua py-4">
              <Elo href={`/servicos/${s.slug}`} className="letreiro traco text-[clamp(30px,4vw,54px)] [--wdth:58]">
                {s.nome}
              </Elo>
              {s.agendavelOnline ? (
                <Elo href={`/agendar?servico=${s.slug}&com=${p.slug}`} className="carimbo carimbo-vazado !py-2.5 !text-[13px]" data-abana>
                  Agendar com {p.nome.split(" ").slice(0, 2).join(" ")}
                </Elo>
              ) : (
                <span className="selo">Agenda por telefone</span>
              )}
            </li>
          ))}
        </ul>
        {agendaveis.length === 0 && <p className="mt-6">Os serviços deste profissional são marcados pela recepção.</p>}
      </section>
    </main>
  );
}

export default function Profissional(props: Props) {
  return (
    <Ficha>
      <Conteudo {...props} />
    </Ficha>
  );
}
