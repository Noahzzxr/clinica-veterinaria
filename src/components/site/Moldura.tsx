import { obterClinica } from "@/lib/dados";
import { fmtTelefone, linkWhatsApp, resumirHorarios } from "@/lib/formato";
import Elo from "./Elo";
import Menu from "./Menu";
import { ROTAS } from "./rotas";

export const MSG_PLANTAO = "Emergência: preciso de atendimento agora.";

/** Faixa rosa presa no topo de todas as páginas: o plantão está sempre a um toque. */
export async function BarraPlantao() {
  const c = await obterClinica();
  const numero = c.whatsappPlantao ?? c.unidade.whatsapp ?? "";
  return (
    <a
      href={linkWhatsApp(numero, MSG_PLANTAO)}
      target="_blank"
      rel="noopener"
      data-abana
      className="group fixed inset-x-0 top-0 z-[70] flex h-9 items-center justify-between gap-4 border-b-2 border-focinho bg-lingua px-4 text-focinho lg:px-8"
    >
      <span className="letreiro-largo text-[13px]">Plantão 24h</span>
      <span className="hidden text-sm font-medium sm:inline">
        Emergência agora? <span className="traco group-hover:bg-[length:100%_2px]">Chame no WhatsApp</span>
      </span>
      <span className="mono text-[13px] font-semibold">{fmtTelefone(numero)}</span>
    </a>
  );
}

export async function Cabecalho() {
  const c = await obterClinica();
  return (
    <header className="frente dentro flex items-center justify-between gap-6 pb-3 pt-[calc(2.25rem+14px)]">
      <Elo href="/" volta className="group flex items-baseline gap-3">
        <span className="letreiro text-[40px] transition-[--wdth] duration-300 group-hover:[--wdth:92] lg:text-[46px]">{c.nome}</span>
        <span className="rotulo hidden sm:inline">clínica veterinária</span>
      </Elo>
      <div className="flex items-center gap-6">
        <Menu />
        <Elo href="/agendar" className="carimbo hidden !px-4 !py-3 !text-[13px] lg:inline-flex" data-abana>
          Agendar
        </Elo>
      </div>
    </header>
  );
}

export async function Rodape() {
  const c = await obterClinica();
  const u = c.unidade;
  return (
    <footer className="sobre-escuro relative overflow-hidden bg-focinho text-osso">
      <div className="dentro grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="rotulo text-lingua">Endereço</p>
          <p className="mt-3 text-lg leading-snug">
            {u.endereco}
            <br />
            {u.bairro} · {u.cidade}, {u.uf}
            <br />
            <span className="mono text-base">{u.cep}</span>
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="rotulo text-lingua">Horários</p>
          <ul className="mono mt-3 space-y-1 text-base">
            {resumirHorarios(u.horarios).map((h) => (
              <li key={h}>{h}</li>
            ))}
            {u.plantao24h && <li>plantão 24h, todos os dias</li>}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="rotulo text-lingua">Site</p>
          <ul className="mt-3 space-y-1">
            {ROTAS.map((r) => (
              <li key={r.href}>
                <Elo href={r.href} className="traco">
                  {r.nome}
                </Elo>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="rotulo text-lingua">Para você</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Elo href="/agendar" className="traco">
                Agendar online
              </Elo>
            </li>
            <li>
              <Elo href="/plantao" className="traco">
                Plantão e emergência
              </Elo>
            </li>
            <li>
              <Elo href="/privacidade" className="traco">
                Privacidade e seus dados
              </Elo>
            </li>
          </ul>
        </div>
      </div>
      <div className="dentro flex flex-wrap items-center justify-between gap-3 border-t border-osso/30 py-5">
        <p className="mono text-sm">
          {c.razaoSocial ?? c.nome}
          {c.cnpj ? ` · CNPJ ${c.cnpj}` : ""}
        </p>
        {c.dadosDeExemplo && (
          <p className="selo border-lingua text-lingua">Dados de exemplo: nome, endereço, equipe e depoimentos são fictícios</p>
        )}
      </div>
      <p aria-hidden className="letreiro -mb-[0.16em] select-none whitespace-nowrap text-center text-[27vw] text-osso">
        {c.nome}
      </p>
    </footer>
  );
}
