import type { Metadata } from "next";
import Elo from "@/components/site/Elo";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarServicos } from "@/lib/dados";
import { duracao, reais } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Consultas, vacinas, exames de imagem, cirurgias, banho e tosa, hotel e creche, com preço à vista e agendamento online.",
  alternates: { canonical: "/servicos" },
};

const GRUPOS = [
  ["CONSULTA", "Consultas"],
  ["VACINA", "Vacinas"],
  ["EXAME", "Exames"],
  ["CIRURGIA", "Cirurgias"],
  ["ESTETICA", "Banho e tosa"],
  ["HOSPEDAGEM", "Hotel e creche"],
  ["OUTRO", "Outros"],
] as const;

export default async function Servicos() {
  const servicos = await listarServicos();
  return (
    <Ficha>
      <main>
        <Topo rotulo={`Serviços · ${servicos.length} na casa`} titulo="Do focinho ao rabo" pose="farejando">
          <p>Preço à vista, duração prevista e horário marcado. O que não dá para agendar pelo site, a recepção marca por telefone.</p>
        </Topo>
        <div className="dentro pb-28">
          {GRUPOS.map(([chave, nome]) => {
            const lista = servicos.filter((s) => s.categoria === chave);
            if (!lista.length) return null;
            return (
              <section key={chave} aria-labelledby={`g-${chave}`} className="mt-10 lg:mr-[17%]">
                <h2 id={`g-${chave}`} className="rotulo border-b-2 border-focinho pb-2">
                  {nome}
                </h2>
                <ul>
                  {lista.map((s) => (
                    <li key={s.id} className="border-b border-regua">
                      <Elo href={`/servicos/${s.slug}`} className="servico !grid-cols-1 lg:!grid-cols-[minmax(0,1fr)_auto]">
                        <span>
                          <span className="nome block">{s.nome}</span>
                          <span className="mt-2 block text-[17px]">{s.descricao}</span>
                        </span>
                        <span className="mono text-sm lg:text-right">
                          {duracao(s.duracaoMin)}
                          <br />a partir de {reais(s.precoCentavos)}
                          <br />
                          <span className={`selo mt-2 ${s.agendavelOnline ? "selo-cheio" : ""}`}>{s.agendavelOnline ? "Agenda online" : "Agenda por telefone"}</span>
                        </span>
                        <svg className="caneta" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden>
                          <path pathLength={1} d="M2 7 C 90 2, 170 10, 260 6 S 430 2, 520 7 S 700 11, 790 5 S 930 3, 998 7" />
                        </svg>
                      </Elo>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </Ficha>
  );
}
