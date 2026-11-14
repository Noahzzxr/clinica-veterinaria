import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Elo from "@/components/site/Elo";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarServicos, obterClinica, obterServico } from "@/lib/dados";
import { duracao, fmtTelefone, linkWhatsApp, reais } from "@/lib/formato";
import { Texto } from "@/lib/texto";

type Props = { params: Promise<{ slug: string }> };

// A rota espera o dado antes de responder: assim um endereço que não existe devolve 404 de verdade.
// As páginas conhecidas são geradas de antemão por generateStaticParams e o dado é cacheado.
export const instant = false;

export async function generateStaticParams() {
  return (await listarServicos()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await obterServico((await params).slug);
  if (!s) return {};
  return { title: s.nome, description: s.descricao ?? undefined, alternates: { canonical: `/servicos/${s.slug}` } };
}

async function Conteudo({ params }: Props) {
  const [s, clinica] = await Promise.all([obterServico((await params).slug), obterClinica()]);
  if (!s) notFound();
  const u = clinica.unidade;
  const dados = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.nome,
    description: s.descricao,
    provider: { "@type": "VeterinaryCare", name: clinica.nome },
    areaServed: u.cidade,
    offers: { "@type": "Offer", priceCurrency: "BRL", price: (s.precoCentavos / 100).toFixed(2) },
  };
  return (
    <main>
      <Topo
        rotulo={
          <Elo href="/servicos" volta className="traco">
            ← Serviços
          </Elo>
        }
        titulo={s.nome}
        pose="olhandoCima"
      >
        <p>{s.descricao}</p>
      </Topo>
      <div className="dentro grid gap-x-14 gap-y-12 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">{s.descricaoLonga && <Texto fonte={s.descricaoLonga} />}</div>
        <aside className="frente self-start border-2 border-focinho p-6 lg:col-span-4 lg:col-start-9" style={{ transform: "rotate(-1deg)" }}>
          <dl className="mono grid grid-cols-[6.5rem_1fr] gap-y-2 text-[15px]">
            <dt className="font-semibold">Duração</dt>
            <dd>{duracao(s.duracaoMin)}</dd>
            <dt className="font-semibold">Valor</dt>
            <dd>a partir de {reais(s.precoCentavos)}</dd>
            {s.profissionais.length > 0 && (
              <>
                <dt className="font-semibold">Com</dt>
                <dd>
                  {s.profissionais.map(({ usuario }) =>
                    usuario.slug ? (
                      <Elo key={usuario.slug} href={`/equipe/${usuario.slug}`} className="traco block w-fit">
                        {usuario.nome}
                      </Elo>
                    ) : (
                      <span key={usuario.nome} className="block">
                        {usuario.nome}
                      </span>
                    ),
                  )}
                </dd>
              </>
            )}
          </dl>
          <div className="mt-6">
            {s.agendavelOnline ? (
              <Elo href={`/agendar?servico=${s.slug}`} className="carimbo" data-abana>
                Agendar <span aria-hidden>→</span>
              </Elo>
            ) : (
              <>
                <p className="mb-4 text-[15px]">Este serviço é marcado depois de uma avaliação. Fale com a recepção.</p>
                <a href={linkWhatsApp(u.whatsapp ?? "", `Olá! Quero saber sobre ${s.nome}.`)} target="_blank" rel="noopener" className="carimbo" data-abana>
                  Falar no WhatsApp
                </a>
                <p className="mono mt-4 text-[15px]">{fmtTelefone(u.telefone)}</p>
              </>
            )}
          </div>
        </aside>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }} />
    </main>
  );
}

export default function Servico(props: Props) {
  return (
    <Ficha>
      <Conteudo {...props} />
    </Ficha>
  );
}
