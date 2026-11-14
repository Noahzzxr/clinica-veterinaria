import type { Metadata } from "next";
import { cena } from "@/components/cao/estado";
import Elo from "@/components/site/Elo";
import Ficha from "@/components/site/Ficha";
import { MSG_PLANTAO } from "@/components/site/Moldura";
import { obterClinica } from "@/lib/dados";
import { fmtTelefone, linkWhatsApp } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Plantão 24 horas",
  description: "Emergência veterinária 24 horas, todos os dias. Veja os sinais de emergência e chame pelo WhatsApp.",
  alternates: { canonical: "/plantao" },
};

const SINAIS = [
  ["Respiração difícil", "Boca aberta, língua arroxeada, barriga puxando para respirar."],
  ["Barriga inchada e dura", "Tenta vomitar e não sai nada. Em cães grandes, pode ser torção de estômago."],
  ["Convulsão", "Dura mais de dois minutos ou se repete no mesmo dia."],
  ["Não consegue urinar", "Vai à caixa ou ao quintal várias vezes sem resultado. Em gato macho, é urgente."],
  ["Sangramento", "Não para depois de cinco minutos de pressão com pano limpo."],
  ["Suspeita de veneno", "Chocolate, uva, remédio humano, raticida ou planta. Traga a embalagem."],
  ["Atropelamento ou queda", "Mesmo que ele levante e pareça bem: pode haver lesão interna."],
];

export default async function Plantao() {
  const c = await obterClinica();
  const numero = c.whatsappPlantao ?? c.unidade.whatsapp ?? "";
  return (
    <Ficha>
      <main className="sobre-escuro bg-focinho text-osso" {...cena({ pose: "alerta", x: 0.9, y: 0.95, escala: 0.85, giro: -0.75 })}>
        <header className="dentro pb-16 pt-10 lg:pt-14">
          <p className="rotulo text-lingua">Emergência veterinária · todos os dias</p>
          <h1 className="letreiro mt-3 text-[min(30vw,46svh)] text-lingua">Plantão 24h</h1>
          <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-12">
            <p className="text-2xl leading-snug lg:col-span-6 lg:text-[28px]">
              Avise pelo WhatsApp que está a caminho. A equipe prepara a sala antes de você chegar e orienta o que fazer no trajeto.
            </p>
            <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-8">
              <a href={linkWhatsApp(numero, MSG_PLANTAO)} target="_blank" rel="noopener" className="carimbo carimbo-rosa !text-lg !shadow-[5px_5px_0_var(--color-osso)]" data-abana>
                Chamar agora <span aria-hidden>→</span>
              </a>
              <p className="mono text-xl">{fmtTelefone(numero)}</p>
              <p className="mono text-base">
                {c.unidade.endereco}, {c.unidade.bairro}
              </p>
            </div>
          </div>
        </header>

        <section aria-labelledby="t-sinais" className="dentro pb-20">
          <h2 id="t-sinais" className="rotulo border-b-2 border-osso pb-2 text-lingua lg:mr-[17%]">
            Venha imediatamente se houver
          </h2>
          <ol className="lg:mr-[17%]">
            {SINAIS.map(([sinal, detalhe]) => (
              <li key={sinal} className="grid gap-x-10 gap-y-1 border-b border-osso/30 py-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:items-baseline">
                <span className="letreiro text-[clamp(36px,5.4vw,80px)] [--wdth:56]">{sinal}</span>
                <span className="text-lg leading-snug">{detalhe}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="t-caminho" className="dentro grid gap-x-14 gap-y-6 pb-28 lg:grid-cols-12">
          <h2 id="t-caminho" className="letreiro text-[clamp(44px,6vw,88px)] text-lingua lg:col-span-5">
            No caminho
          </h2>
          <ul className="space-y-4 text-xl leading-snug lg:col-span-6">
            <li>Mantenha o animal aquecido e o mais parado possível.</li>
            <li>Não dê remédio, leite nem provoque vômito.</li>
            <li>Se ele engoliu alguma coisa, traga a embalagem ou uma foto.</li>
            <li>Animal com dor pode morder. Aproxime-se devagar e, se preciso, use uma toalha.</li>
            <li className="pt-4 text-base">
              Na dúvida se é emergência, chame mesmo assim. Para o que pode esperar,{" "}
              <Elo href="/agendar" className="underline decoration-2 underline-offset-4">
                agende uma consulta
              </Elo>
              .
            </li>
          </ul>
        </section>
      </main>
    </Ficha>
  );
}
