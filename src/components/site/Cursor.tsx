"use client";

import { useEffect, useRef } from "react";

const CLICAVEL = "a, button, summary, [role='button'], label[for], input[type='submit'], input[type='checkbox'], input[type='radio'], select";
const CAMPO = "input:not([type='checkbox']):not([type='radio']):not([type='submit']), textarea";

/** Cursor próprio: um ponto de tinta que vira pata sobre o que é clicável. Só aparece com mouse. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    const raiz = document.documentElement;
    let x = -100;
    let y = -100;
    let quadro = 0;
    let pendente = false;

    const pinta = () => {
      pendente = false;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const aoMover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      raiz.classList.add("tem-cursor");
      x = e.clientX;
      y = e.clientY;
      if (!pendente) {
        pendente = true;
        quadro = requestAnimationFrame(pinta);
      }
    };
    const aoPassar = (e: PointerEvent) => {
      const alvo = e.target instanceof Element ? e.target : null;
      el.classList.toggle("sobre", !!alvo?.closest(CLICAVEL));
      raiz.classList.toggle("sobre-campo", !!alvo?.closest(CAMPO));
    };
    const aperta = () => el.classList.add("aperta");
    const solta = () => el.classList.remove("aperta");
    const some = () => raiz.classList.remove("tem-cursor");

    window.addEventListener("pointermove", aoMover, { passive: true });
    document.addEventListener("pointerover", aoPassar, { passive: true });
    window.addEventListener("pointerdown", aperta, { passive: true });
    window.addEventListener("pointerup", solta, { passive: true });
    document.addEventListener("mouseleave", some);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("pointerover", aoPassar);
      window.removeEventListener("pointerdown", aperta);
      window.removeEventListener("pointerup", solta);
      document.removeEventListener("mouseleave", some);
      raiz.classList.remove("tem-cursor", "sobre-campo");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden>
      <span className="ponto" />
      <svg className="pata" viewBox="0 0 34 34">
        <g fill="#C9782A" stroke="#18130F" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M17 15.5c-4.6 0-8.2 3.6-8.2 7.6 0 2.9 2.3 4.6 4.6 4.1 1.5-.3 2.3-.8 3.6-.8s2.1.5 3.6.8c2.3.5 4.6-1.2 4.6-4.1 0-4-3.6-7.6-8.2-7.6Z" />
          <ellipse cx="7.6" cy="14.2" rx="2.7" ry="3.5" transform="rotate(-22 7.6 14.2)" />
          <ellipse cx="13.2" cy="8.4" rx="2.8" ry="3.7" transform="rotate(-8 13.2 8.4)" />
          <ellipse cx="20.8" cy="8.4" rx="2.8" ry="3.7" transform="rotate(8 20.8 8.4)" />
          <ellipse cx="26.4" cy="14.2" rx="2.7" ry="3.5" transform="rotate(22 26.4 14.2)" />
        </g>
      </svg>
    </div>
  );
}
