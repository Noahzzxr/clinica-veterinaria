"use client";

// Agendamento online: uma ficha em cinco campos. Dias e horários vêm do servidor a cada escolha
// e os horários do dia aberto são reconsultados a cada 30 segundos.

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { agendar, consultarDias, consultarHorarios, type RespostaAgendar } from "@/app/(site)/agendar/acoes";
import { cena, type NomePose } from "@/components/cao/estado";
import type { Vaga } from "@/lib/agenda";
import { duracao, reais } from "@/lib/formato";
import { fmtDiaCurto } from "@/lib/tempo";

export type ServicoAgendavel = {
  id: string;
  slug: string;
  nome: string;
  descricao: string | null;
  duracaoMin: number;
  precoCentavos: number;
  profissionais: { id: string; slug: string | null; nome: string }[];
};

type Props = { servicos: ServicoAgendavel[]; especies: { id: string; nome: string }[]; servicoInicial?: string; profissionalInicial?: string };

function Passo({ n, titulo, feito, children }: { n: number; titulo: string; feito?: string; children: React.ReactNode }) {
  return (
    <fieldset className="pauta min-w-0 py-7">
      <legend className="float-left mb-5 flex w-full items-baseline gap-4">
        <span className="rotulo">{String(n).padStart(2, "0")}</span>
        <span className="letreiro text-[clamp(34px,4.2vw,56px)] [--wdth:60]">{titulo}</span>
        {feito && <span className="selo selo-cheio ml-auto">{feito}</span>}
      </legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

const opcao =
  "border-2 border-focinho px-4 py-3 text-left transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0.5 aria-pressed:bg-focinho aria-pressed:text-osso";

export default function Agendador({ servicos, especies, servicoInicial, profissionalInicial }: Props) {
  const inicial = servicos.find((s) => s.slug === servicoInicial);
  const [servicoId, setServicoId] = useState(inicial?.id ?? "");
  const [profId, setProfId] = useState(() => inicial?.profissionais.find((p) => p.slug === profissionalInicial)?.id ?? "");
  const [dias, setDias] = useState<{ data: string; vagas: number }[] | null>(null);
  const [data, setData] = useState("");
  const [vagas, setVagas] = useState<Vaga[] | null>(null);
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [resposta, setResposta] = useState<RespostaAgendar | null>(null);
  const [enviando, iniciar] = useTransition();
  const formulario = useRef<HTMLFormElement>(null);

  const servico = useMemo(() => servicos.find((s) => s.id === servicoId), [servicos, servicoId]);
  const prof = servico?.profissionais.find((p) => p.id === profId);

  // Dias com vaga: muda com serviço e profissional.
  useEffect(() => {
    if (!servicoId) return;
    let vivo = true;
    consultarDias(servicoId, profId || null).then((d) => vivo && setDias(d));
    return () => {
      vivo = false;
    };
  }, [servicoId, profId]);

  const carregarHorarios = useCallback(async () => {
    if (!servicoId || !data) return;
    const lista = await consultarHorarios(servicoId, profId || null, data);
    setVagas(lista);
    setVaga((atual) => (atual && !lista.some((v) => v.inicio === atual.inicio && v.profissionalId === atual.profissionalId) ? null : atual));
  }, [servicoId, profId, data]);

  useEffect(() => {
    if (!data) return;
    const primeiro = setTimeout(carregarHorarios, 0);
    const relogio = setInterval(carregarHorarios, 30_000);
    return () => {
      clearTimeout(primeiro);
      clearInterval(relogio);
    };
  }, [data, carregarHorarios]);

  // Trocar uma escolha limpa as que dependem dela; os efeitos acima só buscam os dados.
  function trocar(novoServico: string, novoProf: string) {
    setServicoId(novoServico);
    setProfId(novoProf);
    setDias(null);
    setData("");
    setVagas(null);
    setVaga(null);
  }
  function escolherDia(d: string) {
    if (d === data) return;
    setData(d);
    setVagas(null);
    setVaga(null);
  }

  const feito = resposta?.ok ? resposta.resumo : null;
  const erros = resposta && !resposta.ok ? resposta.campos ?? {} : {};
  const pose: NomePose = feito ? "sentado" : !servicoId ? "farejando" : !data ? "olhandoCima" : !vaga ? "alerta" : "sentado";

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!servico || !vaga) return;
    const f = new FormData(e.currentTarget);
    iniciar(async () => {
      const r = await agendar({
        servicoId: servico.id,
        profissionalId: vaga.profissionalId,
        inicio: vaga.inicio,
        nome: f.get("nome"),
        telefone: f.get("telefone"),
        email: f.get("email") ?? "",
        petNome: f.get("petNome"),
        especieId: f.get("especieId") ?? "",
        observacoes: f.get("observacoes") ?? "",
        consentimento: f.get("consentimento") === "on",
        site: f.get("site") ?? "",
      });
      setResposta(r);
      if (!r.ok && r.horarioPerdido) {
        setVaga(null);
        carregarHorarios();
      }
      if (r.ok) window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const canhoto = (
    <aside
      aria-label="Resumo do agendamento"
      className="frente relative border-2 border-focinho bg-osso p-5 lg:sticky lg:top-16"
      style={{ transform: "rotate(1.2deg)" }}
    >
      <p className="rotulo border-b-2 border-dashed border-focinho pb-3">Canhoto do agendamento</p>
      <dl className="mono mt-4 grid grid-cols-[6.5rem_1fr] gap-y-2 text-[15px]">
        <dt className="font-semibold">Serviço</dt>
        <dd>{feito?.servico ?? servico?.nome ?? "—"}</dd>
        <dt className="font-semibold">Com</dt>
        <dd>{feito?.profissional ?? vaga?.profissional ?? prof?.nome ?? (servico ? "quem estiver livre" : "—")}</dd>
        <dt className="font-semibold">Dia</dt>
        <dd>{feito?.quando ?? (data ? `${fmtDiaCurto(data).sem} ${fmtDiaCurto(data).dia}` : "—")}</dd>
        <dt className="font-semibold">Hora</dt>
        <dd>{feito?.hora ?? vaga?.hora ?? "—"}</dd>
        <dt className="font-semibold">Duração</dt>
        <dd>{servico ? duracao(servico.duracaoMin) : "—"}</dd>
        <dt className="font-semibold">Valor</dt>
        <dd>{feito?.valor ?? (servico ? `a partir de ${reais(servico.precoCentavos)}` : "—")}</dd>
      </dl>
      {feito && (
        <p
          className="letreiro pointer-events-none absolute -right-3 bottom-4 border-4 border-focinho bg-lingua px-3 pb-1 pt-2 text-[54px] [--wdth:70]"
          style={{ transform: "rotate(-9deg)", animation: "bate 380ms cubic-bezier(.2,.9,.3,1) both" }}
        >
          Marcado
        </p>
      )}
    </aside>
  );

  if (feito) {
    return (
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12" {...cena({ pose, x: 0.9, y: 0.95, escala: 0.8, giro: -0.7 })}>
        <div className="lg:col-span-7" role="status">
          <p className="letreiro titulo">Marcado.</p>
          <p className="medida mt-6 text-xl">
            {feito.pet} tem {feito.servico.toLowerCase()} {feito.quando}, às {feito.hora}, com {feito.profissional}. Anote o horário: a
            clínica confirma pelo WhatsApp.
          </p>
          <p className="medida mt-4">Se precisar remarcar ou cancelar, ligue ou responda a mensagem de confirmação.</p>
          <p className="mt-8">
            <button type="button" className="carimbo carimbo-vazado" onClick={() => location.reload()}>
              Fazer outro agendamento
            </button>
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">{canhoto}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12" {...cena({ pose, x: 0.9, y: 0.95, escala: 0.8, giro: -0.7 })}>
      <form ref={formulario} onSubmit={enviar} noValidate className="min-w-0 border-b-2 border-focinho lg:col-span-7">
        <Passo n={1} titulo="Serviço" feito={servico?.nome}>
          <div className="grid gap-3 sm:grid-cols-2">
            {servicos.map((s) => (
              <button
                key={s.id}
                type="button"
                className={opcao}
                aria-pressed={s.id === servicoId}
                onClick={() => s.id !== servicoId && trocar(s.id, s.profissionais.some((p) => p.id === profId) ? profId : "")}
              >
                <span className="letreiro-largo block text-base">{s.nome}</span>
                <span className="mono mt-1 block text-[13px]">
                  {duracao(s.duracaoMin)} · {reais(s.precoCentavos)}
                </span>
              </button>
            ))}
          </div>
        </Passo>

        {servico && (
          <Passo n={2} titulo="Com quem" feito={prof?.nome ?? "tanto faz"}>
            <div className="flex flex-wrap gap-3">
              <button type="button" className={opcao} aria-pressed={!profId} onClick={() => profId && trocar(servicoId, "")}>
                <span className="letreiro-largo text-base">Tanto faz</span>
                <span className="mono block text-[13px]">o primeiro horário livre</span>
              </button>
              {servico.profissionais.map((p) => (
                <button key={p.id} type="button" className={opcao} aria-pressed={p.id === profId} onClick={() => p.id !== profId && trocar(servicoId, p.id)}>
                  <span className="letreiro-largo text-base">{p.nome}</span>
                </button>
              ))}
            </div>
          </Passo>
        )}

        {servico && (
          <Passo n={3} titulo="Dia" feito={data ? `${fmtDiaCurto(data).sem} ${fmtDiaCurto(data).dia}` : undefined}>
            {!dias ? (
              <p className="mono" role="status">
                Consultando a agenda…
              </p>
            ) : dias.every((d) => !d.vagas) ? (
              <p className="font-bold">Sem horários livres nas próximas três semanas. Ligue para a clínica ou escolha outro profissional.</p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {dias.map((d) => {
                  const r = fmtDiaCurto(d.data);
                  return (
                    <button
                      key={d.data}
                      type="button"
                      disabled={!d.vagas}
                      aria-pressed={d.data === data}
                      aria-label={`${r.sem} ${r.dia}, ${d.vagas ? `${d.vagas} horários` : "sem horários"}`}
                      onClick={() => escolherDia(d.data)}
                      className="border-2 border-focinho px-1 py-2 text-center transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0.5 disabled:translate-y-0 disabled:border-dashed disabled:border-regua aria-pressed:bg-focinho aria-pressed:text-osso"
                    >
                      <span className="rotulo block">{r.sem}</span>
                      <span className={`mono block text-[15px] font-semibold ${d.vagas ? "" : "line-through"}`}>{r.dia}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </Passo>
        )}

        {servico && data && (
          <Passo n={4} titulo="Horário" feito={vaga?.hora}>
            {!vagas ? (
              <p className="mono" role="status">
                Consultando horários…
              </p>
            ) : !vagas.length ? (
              <p className="font-bold">Os horários deste dia acabaram de ser ocupados. Escolha outro dia.</p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {vagas.map((h) => (
                  <button
                    key={h.inicio}
                    type="button"
                    aria-pressed={vaga?.inicio === h.inicio}
                    onClick={() => setVaga(h)}
                    className="mono border-2 border-focinho py-2.5 text-center text-base font-semibold transition-transform duration-100 hover:-translate-y-0.5 active:translate-y-0.5 aria-pressed:bg-lingua"
                  >
                    {h.hora}
                  </button>
                ))}
              </div>
            )}
          </Passo>
        )}

        {servico && vaga && (
          <Passo n={5} titulo="Seus dados">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="campo">
                <label htmlFor="nome">Seu nome</label>
                <input id="nome" name="nome" autoComplete="name" required aria-invalid={!!erros.nome} aria-describedby={erros.nome ? "e-nome" : undefined} />
                {erros.nome && <p id="e-nome" className="erro">{erros.nome}</p>}
              </div>
              <div className="campo">
                <label htmlFor="telefone">Telefone com DDD (WhatsApp)</label>
                <input id="telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="(11) 90000-0000" aria-invalid={!!erros.telefone} aria-describedby={erros.telefone ? "e-telefone" : undefined} />
                {erros.telefone && <p id="e-telefone" className="erro">{erros.telefone}</p>}
              </div>
              <div className="campo">
                <label htmlFor="email">E-mail (opcional)</label>
                <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!erros.email} aria-describedby={erros.email ? "e-email" : undefined} />
                {erros.email && <p id="e-email" className="erro">{erros.email}</p>}
              </div>
              <div className="campo">
                <label htmlFor="petNome">Nome do pet</label>
                <input id="petNome" name="petNome" required aria-invalid={!!erros.petNome} aria-describedby={erros.petNome ? "e-pet" : undefined} />
                {erros.petNome && <p id="e-pet" className="erro">{erros.petNome}</p>}
              </div>
              <div className="campo">
                <label htmlFor="especieId">Espécie</label>
                <select id="especieId" name="especieId" defaultValue={especies[0]?.id} required>
                  {especies.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="campo sm:col-span-2">
                <label htmlFor="observacoes">O que está acontecendo (opcional)</label>
                <textarea id="observacoes" name="observacoes" maxLength={500} className="!min-h-[84px]" />
              </div>
              {/* Campo-isca para robôs: fica fora da tela e da ordem de tabulação. */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label htmlFor="site">Não preencha</label>
                <input id="site" name="site" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="flex items-start gap-3 text-[15px] sm:col-span-2">
                <input type="checkbox" name="consentimento" className="mt-1 size-5 accent-focinho" required aria-invalid={!!erros.consentimento} />
                <span>
                  Autorizo a clínica a usar estes dados para o atendimento e para avisos sobre este agendamento, conforme a{" "}
                  <a href="/privacidade" target="_blank" className="underline decoration-2 underline-offset-2">
                    política de privacidade
                  </a>
                  .{erros.consentimento && <strong className="block">{erros.consentimento}</strong>}
                </span>
              </label>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button type="submit" className="carimbo carimbo-rosa" disabled={enviando} data-abana>
                {enviando ? "Marcando…" : `Marcar ${vaga.hora}`} <span aria-hidden>→</span>
              </button>
              <p role="alert" className="font-bold">
                {resposta && !resposta.ok ? resposta.erro : ""}
              </p>
            </div>
          </Passo>
        )}
      </form>
      <div className="lg:col-span-4 lg:col-start-9">{canhoto}</div>
    </div>
  );
}
