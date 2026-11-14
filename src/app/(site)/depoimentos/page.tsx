import type { Metadata } from "next";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarDepoimentos, obterClinica } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Depoimentos",
  description: "O que dizem os tutores que já trouxeram seus bichos.",
  alternates: { canonical: "/depoimentos" },
};

export default async function Depoimentos() {
  const [depoimentos, clinica] = await Promise.all([listarDepoimentos(), obterClinica()]);
  return (
    <Ficha>
      <main>
        <Topo rotulo="Depoimentos" titulo="Quem já veio" pose="barrigaCima">
          {clinica.dadosDeExemplo && (
            <p>
              <span className="selo selo-alerta !text-[12px]">Depoimentos de exemplo</span>
              <span className="mt-3 block text-base">Estes textos são fictícios. Entram os reais quando a clínica aprovar os primeiros no sistema.</span>
            </p>
          )}
        </Topo>
        <ul className="dentro pb-28 lg:mr-[10%]">
          {depoimentos.map((d, i) => (
            <li key={d.id} className={`pauta py-10 ${i % 2 ? "lg:pl-[22%]" : "lg:pr-[22%]"}`}>
              <figure>
                <blockquote>
                  <p className="text-[clamp(26px,3.6vw,52px)] font-medium leading-[1.1]">{d.texto}</p>
                </blockquote>
                <figcaption className="mono mt-5 text-base">
                  {d.autor}
                  {d.pet ? ` · ${d.pet}` : ""}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </main>
    </Ficha>
  );
}
