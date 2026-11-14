"use client";

// Liga a página ao cachorro: lê o ponteiro, o scroll e a seção ativa e escreve no estado.
// O WebGL só é baixado depois que a página está ociosa, e nunca com "movimento reduzido".

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cao, CENA_PADRAO, type Cena as TipoCena } from "./estado";

const Cena = dynamic(() => import("./Cena"), { ssr: false });

const CLICAVEL = "a, button, summary, [role='button'], label[for], input[type='submit']";
const SONO_MS = 20_000;

function temWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const lidas = new WeakMap<Element, { bruto: string; cena: TipoCena | null }>();
function lerAtributo(el: Element): TipoCena | null {
  const bruto = el.getAttribute("data-cao") ?? "";
  const guardada = lidas.get(el);
  if (guardada && guardada.bruto === bruto) return guardada.cena;
  let c: TipoCena | null = null;
  try {
    c = JSON.parse(bruto);
  } catch {}
  lidas.set(el, { bruto, cena: c });
  return c;
}

/** Descobre a seção sob a linha de leitura e traduz o pedido dela para o estado. */
function atualizarCena() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const linha = vh * 0.6;
  let ativa: Element | null = null;
  let acima: Element | null = null;
  const todas = document.querySelectorAll("[data-cao]");
  for (const s of todas) {
    const r = s.getBoundingClientRect();
    if (r.top <= linha && r.bottom > linha) ativa = s;
    if (r.bottom <= linha) acima = s;
  }
  const secao = ativa ?? acima ?? todas[0] ?? null;
  const c = secao ? lerAtributo(secao) : null;
  if (cao.cenaId !== secao) cao.cenaId = secao;
  if (!secao || !c) {
    Object.assign(cao.cena, CENA_PADRAO);
    return;
  }

  let x = c.x;
  let y = c.y;
  let escala = c.escala ?? 1;
  let giro = c.giro ?? CENA_PADRAO.giro;
  const r = secao.getBoundingClientRect();

  if (c.xAte !== undefined) {
    const bruto = c.fixa ? -r.top / Math.max(1, r.height - vh) : (linha - r.top) / Math.max(1, r.height);
    x = c.x + (c.xAte - c.x) * Math.min(1, Math.max(0, bruto));
  }
  if (c.ancora) {
    const a = secao.querySelector(c.ancora);
    if (a) {
      const ra = a.getBoundingClientRect();
      x = (ra.left + ra.width * (c.xAte !== undefined ? x : (c.ax ?? 0.5))) / vw;
      y = (ra.top + ra.height * (c.ay ?? 0)) / vh;
    }
  }
  if (cao.movel) {
    // No celular ele vira companhia de canto: pequeno, embaixo, uma pose por seção.
    x = c.movel?.x ?? 0.8;
    y = c.movel?.y ?? 0.985;
    escala = c.movel?.escala ?? 0.42;
    giro = c.movel?.giro ?? -0.5;
  }
  cao.cena.pose = c.pose;
  cao.cena.x = x;
  cao.cena.y = y;
  cao.cena.escala = escala;
  cao.cena.giro = giro;
}

export default function Palco() {
  const [carregar, setCarregar] = useState(false);

  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido || !temWebGL()) return;

    const estreito = window.matchMedia("(max-width: 767px)");
    const medir = () => {
      cao.movel = estreito.matches;
    };
    medir();
    estreito.addEventListener("change", medir);

    const gesto = () => {
      cao.ultimoGesto = performance.now();
      cao.dormindo = false;
    };
    gesto();

    const aoMover = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") {
        cao.ponteiro.x = e.clientX / window.innerWidth;
        cao.ponteiro.y = e.clientY / window.innerHeight;
        cao.ponteiro.visto = true;
      }
      gesto();
    };
    const aoPassar = (e: PointerEvent) => {
      cao.sobreClicavel = e.target instanceof Element && !!e.target.closest(CLICAVEL);
    };
    const aoClicar = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("[data-abana]")) {
        cao.abanaAte = performance.now() + 2800;
      }
      gesto();
    };

    window.addEventListener("pointermove", aoMover, { passive: true });
    document.addEventListener("pointerover", aoPassar, { passive: true });
    document.addEventListener("click", aoClicar);
    window.addEventListener("scroll", gesto, { passive: true });
    window.addEventListener("keydown", gesto);
    window.addEventListener("touchstart", gesto, { passive: true });

    let quadro = 0;
    const laco = () => {
      atualizarCena();
      if (performance.now() - cao.ultimoGesto > SONO_MS) cao.dormindo = true;
      quadro = requestAnimationFrame(laco);
    };

    // 3D sob demanda. No computador, quando a página fica ociosa depois de carregar.
    // No celular, só no primeiro toque ou scroll: até lá fica o desenho estático.
    const pedir = window.requestIdleCallback ?? ((f: () => void) => window.setTimeout(f, 300));
    let pedido = 0;
    const ligar = () => {
      window.removeEventListener("touchstart", ligar);
      window.removeEventListener("scroll", ligar);
      window.removeEventListener("load", aposCarga);
      quadro = requestAnimationFrame(laco);
      pedido = pedir(() => setCarregar(true)) as number;
    };
    const aposCarga = () => window.setTimeout(ligar, 250);
    if (estreito.matches) {
      window.addEventListener("touchstart", ligar, { passive: true, once: true });
      window.addEventListener("scroll", ligar, { passive: true, once: true });
    } else if (document.readyState === "complete") aposCarga();
    else window.addEventListener("load", aposCarga, { once: true });

    return () => {
      cancelAnimationFrame(quadro);
      (window.cancelIdleCallback ?? window.clearTimeout)(pedido);
      window.removeEventListener("touchstart", ligar);
      window.removeEventListener("scroll", ligar);
      window.removeEventListener("load", aposCarga);
      estreito.removeEventListener("change", medir);
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("pointerover", aoPassar);
      document.removeEventListener("click", aoClicar);
      window.removeEventListener("scroll", gesto);
      window.removeEventListener("keydown", gesto);
      window.removeEventListener("touchstart", gesto);
      document.documentElement.classList.remove("cao-3d");
    };
  }, []);

  if (!carregar) return null;
  return (
    <div className="palco" aria-hidden>
      <Cena aoIniciar={() => document.documentElement.classList.add("cao-3d")} />
    </div>
  );
}
