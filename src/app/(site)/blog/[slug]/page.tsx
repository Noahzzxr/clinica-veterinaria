import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Elo from "@/components/site/Elo";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarPosts, obterClinica, obterPost } from "@/lib/dados";
import { fmtData } from "@/lib/tempo";
import { Texto } from "@/lib/texto";

type Props = { params: Promise<{ slug: string }> };

// A rota espera o dado antes de responder: assim um endereço que não existe devolve 404 de verdade.
// As páginas conhecidas são geradas de antemão por generateStaticParams e o dado é cacheado.
export const instant = false;

export async function generateStaticParams() {
  return (await listarPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await obterPost((await params).slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumo,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.titulo, description: p.resumo, publishedTime: p.publicadoEm?.toISOString() },
  };
}

async function Conteudo({ params }: Props) {
  const [p, clinica] = await Promise.all([obterPost((await params).slug), obterClinica()]);
  if (!p) notFound();
  const dados = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.titulo,
    description: p.resumo,
    datePublished: p.publicadoEm?.toISOString(),
    dateModified: p.atualizadoEm.toISOString(),
    author: p.autor ? { "@type": "Person", name: p.autor.nome } : undefined,
    publisher: { "@type": "Organization", name: clinica.nome },
  };
  return (
    <main>
      <article>
        <Topo
          rotulo={
            <Elo href="/blog" volta className="traco">
              ← Blog
            </Elo>
          }
          titulo={p.titulo}
          pose="deitado"
        >
          <p>{p.resumo}</p>
          <p className="mono mt-5 text-[15px]">
            {p.publicadoEm ? fmtData(p.publicadoEm) : ""}
            {p.autor && (
              <>
                {" · "}
                {p.autor.slug ? (
                  <Elo href={`/equipe/${p.autor.slug}`} className="traco">
                    {p.autor.nome}
                  </Elo>
                ) : (
                  p.autor.nome
                )}
                {p.autor.crmv ? ` · ${p.autor.crmv}` : ""}
              </>
            )}
          </p>
        </Topo>
        <div className="dentro pb-20 lg:pl-[calc(34%+clamp(16px,4vw,56px)*0.3)]">
          <Texto fonte={p.corpo} />
          <p className="mt-14">
            <Elo href="/agendar" className="carimbo" data-abana>
              Agendar consulta <span aria-hidden>→</span>
            </Elo>
          </p>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }} />
    </main>
  );
}

export default function Post(props: Props) {
  return (
    <Ficha>
      <Conteudo {...props} />
    </Ficha>
  );
}
