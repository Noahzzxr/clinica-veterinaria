// As seções da página inicial. Cada uma pede uma pose ao cachorro (atributo data-cao)
// e tem uma animação ligada ao próprio conteúdo, montada em Coreografia.tsx.
import type { CSSProperties } from "react";
import CaoEstatico from "@/components/cao/CaoEstatico";
import { cena } from "@/components/cao/estado";
import Elo from "@/components/site/Elo";
import { MSG_PLANTAO } from "@/components/site/Moldura";
import type { listarAmbientes, listarDepoimentos, listarEquipe, listarPosts, listarProtocolos, listarServicos, obterClinica } from "@/lib/dados";
import { duracao, fmtTelefone, linkWhatsApp, reais, resumirHorarios } from "@/lib/formato";
import { fmtData } from "@/lib/tempo";

type Clinica = Awaited<ReturnType<typeof obterClinica>>;
const v = (o: Record<string, string | number>) => o as CSSProperties;

const ROTULO_CATEGORIA: Record<string, string> = {
  CONSULTA: "Consulta",
  VACINA: "Vacina",
  EXAME: "Exame",
  CIRURGIA: "Cirurgia",
  ESTETICA: "Banho e tosa",
  HOSPEDAGEM: "Hotel",
  OUTRO: "Outros",
};

/** Pegada caramelo: o rastro que o cachorro deixa. Um único traçado, para pesar pouco na página. */
export function Pegada({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 34 34" style={style} aria-hidden>
      <path fill="#C9782A" d="M17 15.5c-4.6 0-8.2 3.6-8.2 7.6 0 2.9 2.3 4.6 4.6 4.1 1.5-.3 2.3-.8 3.6-.8s2.1.5 3.6.8c2.3.5 4.6-1.2 4.6-4.1 0-4-3.6-7.6-8.2-7.6ZM4.8999999999999995 14.2a2.7 3.5 0 1 0 5.4 0a2.7 3.5 0 1 0 -5.4 0ZM10.399999999999999 8.4a2.8 3.7 0 1 0 5.6 0a2.8 3.7 0 1 0 -5.6 0ZM18 8.4a2.8 3.7 0 1 0 5.6 0a2.8 3.7 0 1 0 -5.6 0ZM23.7 14.2a2.7 3.5 0 1 0 5.4 0a2.7 3.5 0 1 0 -5.4 0Z" />
    </svg>
  );
}

function Cabeca({ rotulo, titulo, children, id }: { rotulo: string; titulo: string; children?: React.ReactNode; id: string }) {
  return (
    <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="rotulo">{rotulo}</p>
        <h2 id={id} className="letreiro titulo mt-3">
          {titulo}
        </h2>
      </div>
      {children && <div className="medida pb-2 text-lg lg:col-span-4">{children}</div>}
    </div>
  );
}

// ───────── 1. Abertura ─────────
export function Abertura({ clinica }: { clinica: Clinica }) {
  const palavras = (clinica.slogan ?? "Bicho em boas mãos.").replace(/[.!]+$/, "").split(/\s+/);
  const linhas =
    palavras.length < 3 ? [palavras.join(" ")] : [palavras[0], palavras.slice(1, -1).join(" "), palavras[palavras.length - 1]];
  const u = clinica.unidade;
  return (
    <section
      aria-labelledby="manchete"
      className="relative flex flex-col pb-12 pt-4 lg:min-h-[calc(100svh-7.5rem)] lg:justify-end lg:pb-10 lg:pt-0"
      {...cena({ pose: "sentado", x: 0.7, y: 0.9, escala: 1.12, giro: -0.6, ancora: "[data-chao]", ax: 1.62, ay: 0.9 })}
    >
      <div className="dentro">
        <h1 id="manchete" className="letreiro manchete" aria-label={clinica.slogan ?? linhas.join(" ")}>
          {linhas.map((linha, i) => {
            const ultima = i === linhas.length - 1;
            return (
              <span key={i} className="linha" aria-hidden>
                <span className={`bate${ultima ? " amassa" : ""}`} style={v({ "--i": i })} data-chao={ultima ? "" : undefined}>
                  {linha}
                </span>
                {ultima && (
                  <span className="relative inline-block h-0 w-0 align-baseline">
                    <CaoEstatico className="cao-estatico absolute bottom-[-0.04em] left-[0.08em] h-[1.5em] w-auto max-w-none" />
                  </span>
                )}
              </span>
            );
          })}
        </h1>
      </div>

      <div className="frente dentro mt-9 lg:absolute lg:right-0 lg:top-[6%] lg:mt-0 lg:w-[31rem]">
        <p className="rotulo">
          Clínica veterinária · {u.cidade}, {u.uf}
        </p>
        <p className="mt-4 text-[22px] leading-snug lg:text-2xl">
          Consulta, vacina, cirurgia, internação, banho e hotel no mesmo endereço. E um plantão que atende a qualquer hora.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Elo href="/agendar" className="carimbo" data-abana>
            Agendar consulta <span aria-hidden>→</span>
          </Elo>
          <Elo href="/servicos" className="traco font-medium">
            Ver serviços
          </Elo>
        </div>
        <p className="mono mt-7 text-sm">
          {resumirHorarios(u.horarios).join(" · ")}
          {u.plantao24h ? " · plantão 24h" : ""}
        </p>
      </div>
    </section>
  );
}

// ───────── 2. Plantão ─────────
export function Plantao({ clinica }: { clinica: Clinica }) {
  const numero = clinica.whatsappPlantao ?? clinica.unidade.whatsapp ?? "";
  return (
    <section
      aria-labelledby="t-plantao"
      data-anima="plantao"
      className="sobre-escuro relative overflow-hidden bg-focinho text-osso"
      {...cena({ pose: "alerta", x: 0.82, y: 0.94, escala: 0.95, giro: -0.75 })}
    >
      <p aria-hidden className="faixa letreiro pt-10 text-lingua">
        Plantão 24h · Plantão 24h · Plantão 24h
      </p>
      <div className="dentro grid gap-x-12 gap-y-8 pb-20 pt-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="t-plantao" className="rotulo text-lingua">
            Plantão e emergência
          </h2>
          <p className="mt-4 text-2xl leading-snug lg:text-[28px]">
            Emergência não marca hora. A equipe de plantão atende todos os dias, de madrugada e em feriado. Avise pelo WhatsApp que
            está a caminho e a sala já fica pronta.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-7">
          <a href={linkWhatsApp(numero, MSG_PLANTAO)} target="_blank" rel="noopener" className="carimbo carimbo-rosa !shadow-[5px_5px_0_var(--color-osso)]" data-abana>
            Chamar no WhatsApp <span aria-hidden>→</span>
          </a>
          <p className="mono text-lg">{fmtTelefone(numero)}</p>
          <Elo href="/plantao" className="traco font-medium">
            Como saber se é emergência
          </Elo>
        </div>
      </div>
    </section>
  );
}

// ───────── 3. Serviços ─────────
export function Servicos({ servicos }: { servicos: Awaited<ReturnType<typeof listarServicos>> }) {
  const lista = servicos.slice(0, 8);
  return (
    <section
      aria-labelledby="t-servicos"
      data-anima="servicos"
      className="py-24 lg:py-32"
      {...cena({ pose: "farejando", x: 0.87, y: 0.93, escala: 0.8, giro: -1.0 })}
    >
      <div className="dentro">
        <Cabeca id="t-servicos" rotulo="Serviços" titulo="Do focinho ao rabo">
          <p>Tudo o que seu bicho precisa, com preço à vista e horário marcado. Passe o cursor e escolha.</p>
        </Cabeca>
        <ul className="mt-14 border-b-2 border-focinho lg:mr-[17%]">
          {lista.map((s) => (
            <li key={s.id} className="pauta">
              <Elo href={`/servicos/${s.slug}`} className="servico">
                <span className="rotulo">{ROTULO_CATEGORIA[s.categoria]}</span>
                <span className="nome">{s.nome}</span>
                <span className="mono text-sm lg:text-right">
                  {duracao(s.duracaoMin)} · a partir de {reais(s.precoCentavos)}
                </span>
                <svg className="caneta" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden>
                  <path pathLength={1} d="M2 7 C 90 2, 170 10, 260 6 S 430 2, 520 7 S 700 11, 790 5 S 930 3, 998 7" />
                </svg>
              </Elo>
            </li>
          ))}
        </ul>
        {servicos.length > lista.length && (
          <p className="mt-8">
            <Elo href="/servicos" className="carimbo carimbo-vazado">
              Todos os {servicos.length} serviços
            </Elo>
          </p>
        )}
      </div>
    </section>
  );
}

// ───────── 4. Vacinas ─────────
const idade = (dias: number) => (dias < 60 ? `${dias} dias` : `${Math.round(dias / 30)} meses`);

export function Vacinas({ protocolos }: { protocolos: Awaited<ReturnType<typeof listarProtocolos>> }) {
  const caes = protocolos.filter((p) => p.especie.nome === "Cão");
  const doses = caes
    .flatMap((p) => p.doses.map((d) => ({ vacina: p.nome.replace(/\s*\(.*\)/, ""), dose: d.nome, dias: d.idadeMinDias ?? 0 })))
    .sort((a, b) => a.dias - b.dias);
  const paradas = [...doses.map((d) => ({ ...d, quando: idade(d.dias) })), { vacina: "Reforço", dose: "todas as vacinas", dias: 365, quando: "todo ano" }];
  const total = paradas.length;
  return (
    <section
      aria-labelledby="t-vacinas"
      data-anima="vacinas"
      className="vacinas relative border-y-2 border-focinho bg-osso-2"
      {...cena({ pose: "andando", x: 0.02, xAte: 0.96, y: 0.66, escala: 0.62, ancora: ".trilho", ay: 0, fixa: true })}
    >
      <div className="quadro">
        <div className="dentro pb-10 pt-16 lg:pt-20">
          <Cabeca id="t-vacinas" rotulo="Carteira de vacinação · cães" titulo="Primeiro ano em dia">
            <p>
              O calendário do filhote, dose a dose. Cada aplicação fica na carteira digital com lote e validade, e o lembrete do
              reforço chega antes da data.
            </p>
          </Cabeca>
        </div>
        <div className="dentro md:static">
          <ol className="trilho" style={v({ "--total": total })}>
            <li aria-hidden className="fio" />
            {paradas.map((p, i) => (
              <li key={i} className="dose" style={v({ "--n": i, "--giro": `${[-2.5, 1.5, -1, 2, -2, 1, -1.5][i % 7]}deg` })}>
                <span className="marco" aria-hidden />
                <span className="haste hidden md:block" aria-hidden />
                <div className="cartao">
                  <p className="letreiro-largo text-[15px]">{p.vacina}</p>
                  <p className="mono text-[13px]">{p.dose}</p>
                  <p className="mono text-[13px] font-semibold md:hidden">{p.quando}</p>
                </div>
                <span className="idade rotulo hidden md:block">{p.quando}</span>
              </li>
            ))}
            <li aria-hidden className="pegadas">
              {Array.from({ length: 22 }, (_, i) => (
                <Pegada key={i} style={v({ "--p": (i + 0.6) / 23, "--lado": i % 2 })} />
              ))}
            </li>
          </ol>
          <p className="mt-10 md:absolute md:bottom-8 md:left-[clamp(16px,4vw,56px)] md:mt-0">
            <Elo href="/agendar?servico=vacinacao" className="carimbo" data-abana>
              Agendar vacina
            </Elo>
          </p>
        </div>
        <div className="h-16 md:hidden" />
      </div>
    </section>
  );
}

// ───────── 5. Equipe ─────────
const iniciais = (nome: string) =>
  nome
    .replace(/^(Dra?\.)\s+/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function FichaVet({ p, giro = 0 }: { p: Awaited<ReturnType<typeof listarEquipe>>[number]; giro?: number }) {
  return (
    <article className="ficha-vet" data-aba={p.crmv ?? "Equipe"} style={v({ "--giro": `${giro}deg` })}>
      <div className="retrato" aria-hidden>
        <span className="letreiro">{iniciais(p.nome)}</span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="letreiro text-[44px] [--wdth:58]">{p.nome}</h3>
        <ul className="flex flex-wrap gap-1.5">
          {p.especialidades.map((e) => (
            <li key={e} className="selo">
              {e}
            </li>
          ))}
        </ul>
        {p.bio && <p className="text-[15px] leading-snug">{p.bio}</p>}
        <p className="mt-1">
          <Elo href={`/equipe/${p.slug}`} className="traco font-medium">
            Ver perfil e agenda <span aria-hidden>→</span>
          </Elo>
        </p>
      </div>
    </article>
  );
}

export function Equipe({ equipe }: { equipe: Awaited<ReturnType<typeof listarEquipe>> }) {
  const giros = [-1.6, 1.1, -0.7, 1.4];
  return (
    <section
      aria-labelledby="t-equipe"
      data-anima="equipe"
      className="overflow-x-clip py-24 lg:py-32"
      {...cena({ pose: "olhandoCima", x: 0.9, y: 0.95, escala: 0.85, giro: -0.9 })}
    >
      <div className="dentro">
        <Cabeca id="t-equipe" rotulo="Equipe" titulo="Quem cuida">
          <p>Veterinários com especialidade e tempo para explicar. Você escolhe com quem agendar.</p>
        </Cabeca>
        <div className="arquivo mt-24 grid gap-x-0 gap-y-16 md:grid-cols-2 lg:mr-[14%] lg:grid-cols-3">
          {equipe.map((p, i) => (
            <div key={p.id} className={i % 3 === 1 ? "lg:mt-14 lg:-mx-3" : i % 3 === 2 ? "lg:-mt-6" : ""}>
              <FichaVet p={p} giro={giros[i % giros.length]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── 6. Estrutura ─────────
export function Planta({ ambientes }: { ambientes: Awaited<ReturnType<typeof listarAmbientes>> }) {
  const realce = ambientes
    .map((a) => `.estrutura:has([data-amb="${a.sigla}"]:hover) rect[data-amb="${a.sigla}"],.estrutura:has([data-amb="${a.sigla}"]:focus-visible) rect[data-amb="${a.sigla}"]{fill:var(--color-lingua)}`)
    .join("");
  const entrada = ambientes.find((a) => a.sigla === "REC");
  return (
    <>
      <style>{realce}</style>
      <svg className="planta w-full" viewBox="-2 -2 104 70" role="img" aria-label="Planta da clínica">
        {ambientes.map((a) => (
          <g key={a.id}>
            <rect className="comodo" data-amb={a.sigla} pathLength={1} x={a.x} y={a.y} width={a.largura} height={a.altura} />
            <text x={a.x + 2.2} y={a.y + 5.4}>
              {a.sigla}
            </text>
          </g>
        ))}
        {entrada && (
          <g>
            <rect x={entrada.x + entrada.largura / 2 - 4} y={entrada.y + entrada.altura - 0.8} width="8" height="1.6" fill="var(--color-osso)" />
            <text x={entrada.x + entrada.largura / 2} y={entrada.y + entrada.altura + 4.6} textAnchor="middle">
              ENTRADA ↑
            </text>
          </g>
        )}
      </svg>
    </>
  );
}

export function Estrutura({ ambientes }: { ambientes: Awaited<ReturnType<typeof listarAmbientes>> }) {
  return (
    <section
      aria-labelledby="t-estrutura"
      data-anima="estrutura"
      className="estrutura border-t-2 border-focinho py-24 lg:py-32"
      {...cena({ pose: "andando", x: 0.08, xAte: 0.9, y: 0.96, escala: 0.6 })}
    >
      <div className="dentro">
        <Cabeca id="t-estrutura" rotulo="Estrutura" titulo="Por dentro">
          <p>Tudo no mesmo endereço, sem levar o bicho de um lugar para outro. Passe pelos nomes para ver cada sala na planta.</p>
        </Cabeca>
        <div className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Planta ambientes={ambientes} />
          </div>
          <ul className="border-b-2 border-focinho lg:col-span-5">
            {ambientes.map((a) => (
              <li key={a.id} className="pauta">
                <Elo href="/estrutura" data-amb={a.sigla} className="comodo-item grid grid-cols-[3.5rem_1fr] items-baseline gap-x-3 py-3">
                  <span className="rotulo">{a.sigla}</span>
                  <span>
                    <span className="letreiro-largo text-base">{a.nome}</span>
                    <span className="block text-[15px] leading-snug">{a.descricao}</span>
                  </span>
                </Elo>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ───────── 7. Depoimentos ─────────
export function Depoimentos({ depoimentos, exemplo }: { depoimentos: Awaited<ReturnType<typeof listarDepoimentos>>; exemplo: boolean }) {
  const [primeiro, ...outros] = depoimentos;
  if (!primeiro) return null;
  return (
    <section
      aria-labelledby="t-depoimentos"
      data-anima="depoimentos"
      className="sobre-escuro bg-focinho py-24 text-osso lg:py-32"
      {...cena({ pose: "barrigaCima", x: 0.9, y: 0.95, escala: 0.85, giro: -0.5 })}
    >
      <div className="dentro">
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="t-depoimentos" className="rotulo text-lingua">
            Quem já veio
          </h2>
          {exemplo && <span className="selo border-lingua text-lingua">Depoimentos de exemplo</span>}
        </div>
        <figure className="mt-8 lg:w-[78%]">
          <blockquote>
            <p className="datilo text-[clamp(30px,5vw,76px)] font-medium leading-[1.08]">{primeiro.texto}</p>
          </blockquote>
          <figcaption className="mono mt-6 text-base text-lingua">
            {primeiro.autor}
            {primeiro.pet ? ` · tutora de ${primeiro.pet}` : ""}
          </figcaption>
        </figure>
        <div className="mt-20 grid gap-x-10 gap-y-12 md:grid-cols-3 lg:w-[82%]">
          {outros.slice(0, 3).map((d) => (
            <figure key={d.id} className="border-t border-osso/40 pt-5">
              <blockquote>
                <p className="datilo text-xl leading-snug">{d.texto}</p>
              </blockquote>
              <figcaption className="mono mt-4 text-sm text-lingua">
                {d.autor}
                {d.pet ? ` · ${d.pet}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── 8. Blog ─────────
export function CartaoPost({ p }: { p: Awaited<ReturnType<typeof listarPosts>>[number] }) {
  return (
    <Elo href={`/blog/${p.slug}`} className="cartao-post h-full">
      <p className="rotulo">{p.tags.join(" · ")}</p>
      <h3>{p.titulo}</h3>
      <p className="text-[15px] leading-snug">{p.resumo}</p>
      <p className="mono mt-auto text-[13px]">
        {p.publicadoEm ? fmtData(p.publicadoEm) : ""}
        {p.autor ? ` · ${p.autor.nome}` : ""}
      </p>
    </Elo>
  );
}

export function Blog({ posts }: { posts: Awaited<ReturnType<typeof listarPosts>> }) {
  return (
    <section
      aria-labelledby="t-blog"
      data-anima="blog"
      className="overflow-x-clip py-24 lg:py-32"
      {...cena({ pose: "deitado", x: 0.86, y: 0.96, escala: 0.85, giro: -0.8 })}
    >
      <div className="dentro">
        <Cabeca id="t-blog" rotulo="Blog" titulo="Para ler no sofá">
          <p>Orientação escrita pelos veterinários da casa, sem alarmismo.</p>
        </Cabeca>
        <ul className="leque mt-14 grid gap-6 md:grid-cols-3 lg:mr-[16%]">
          {posts.map((p, i) => (
            <li key={p.slug} style={v({ "--i": i })}>
              <CartaoPost p={p} />
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <Elo href="/blog" className="carimbo carimbo-vazado">
            Todos os textos
          </Elo>
        </p>
      </div>
    </section>
  );
}

// ───────── 9. Contato ─────────
export function Contato({ clinica }: { clinica: Clinica }) {
  const u = clinica.unidade;
  return (
    <section
      aria-labelledby="t-contato"
      data-anima="contato"
      className="border-t-2 border-focinho bg-osso-2 py-24 lg:py-32"
      {...cena({ pose: "cavando", x: 0.7, y: 0.9, escala: 0.6, giro: -0.9, ancora: ".pino", ax: 3.2, ay: 1.5 })}
    >
      <div className="dentro">
        <Cabeca id="t-contato" rotulo="Contato" titulo="Vem cá" />
        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-2xl leading-snug">
              {u.endereco}
              <br />
              {u.bairro} · {u.cidade}, {u.uf}
            </p>
            <dl className="mono mt-8 grid grid-cols-[7rem_1fr] gap-y-2 border-y-2 border-focinho py-4 text-base">
              <dt className="font-semibold">Telefone</dt>
              <dd>{fmtTelefone(u.telefone)}</dd>
              <dt className="font-semibold">WhatsApp</dt>
              <dd>{fmtTelefone(u.whatsapp)}</dd>
              <dt className="font-semibold">Horários</dt>
              <dd>
                {resumirHorarios(u.horarios).map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
                {u.plantao24h && <span className="block">plantão 24h</span>}
              </dd>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Elo href="/agendar" className="carimbo" data-abana>
                Agendar <span aria-hidden>→</span>
              </Elo>
              <Elo href="/contato" className="traco font-medium">
                Abrir o mapa e escrever
              </Elo>
            </div>
          </div>
          <div className="lg:col-span-7">
            <svg className="croqui w-full" viewBox="0 0 600 380" role="img" aria-label="Croqui do caminho até a clínica">
              <path className="rua" d="M0 70 H600 M0 190 H600 M0 310 H600 M90 0 V380 M250 0 V380 M410 0 V380 M540 0 V380" />
              <path className="rota" pathLength={1} d="M20 340 V310 H250 V190 H410 V96" />
              <text x="20" y="366" className="mono" fontSize="13" fontWeight="600" letterSpacing="1">
                VOCÊ
              </text>
              <g className="pino">
                <circle cx="410" cy="84" r="17" fill="var(--color-lingua)" stroke="var(--color-focinho)" strokeWidth="4" />
                <circle cx="410" cy="84" r="5" fill="var(--color-focinho)" />
              </g>
              <text x="384" y="78" textAnchor="end" fontSize="24" className="letreiro" style={{ fontVariationSettings: '"wdth" 60, "wght" 900' }}>
                {clinica.nome}
              </text>
              <text x="384" y="98" textAnchor="end" className="mono" fontSize="13">
                {u.endereco}
              </text>
            </svg>
            <p className="rotulo mt-2">Croqui sem escala. O mapa de verdade está na página de contato.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
