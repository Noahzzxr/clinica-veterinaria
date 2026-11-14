import type { Metadata } from "next";
import { Planta } from "@/components/home/secoes";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarAmbientes } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Estrutura",
  description: "Consultórios, centro cirúrgico, imagem, internação, banho e tosa e hotel no mesmo endereço.",
  alternates: { canonical: "/estrutura" },
};

export default async function Estrutura() {
  const ambientes = await listarAmbientes();
  return (
    <Ficha>
      <main className="estrutura">
        <Topo rotulo={`Estrutura · ${ambientes.length} ambientes`} titulo="Por dentro" pose="emPe">
          <p>A planta abaixo é a da clínica. Passe por um ambiente da lista para vê-lo marcado.</p>
        </Topo>
        <div className="dentro grid gap-x-14 gap-y-12 pb-28 lg:grid-cols-12">
          <div className="self-start lg:sticky lg:top-16 lg:col-span-6">
            <Planta ambientes={ambientes} />
            <p className="rotulo mt-2">Planta esquemática, sem escala</p>
          </div>
          <ul className="border-b-2 border-focinho lg:col-span-5 lg:col-start-8 lg:mr-[18%]">
            {ambientes.map((a) => (
              <li key={a.id} className="pauta">
                <div tabIndex={0} data-amb={a.sigla} className="comodo-item py-6">
                  <p className="rotulo">{a.sigla}</p>
                  <h2 className="letreiro mt-1 text-[clamp(36px,4.4vw,60px)] [--wdth:58]">{a.nome}</h2>
                  <p className="mt-3 text-lg leading-snug">{a.descricao}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Ficha>
  );
}
