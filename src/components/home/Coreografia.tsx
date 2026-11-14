"use client";

// O scroll narrativo da página inicial. Cada bloco abaixo é a animação de uma seção, ligada ao que ela mostra.
// A biblioteca de animação só é baixada depois do primeiro gesto do visitante, e cada seção só é montada
// quando se aproxima da tela. Com "movimento reduzido" nada disso roda e o conteúdo fica parado no lugar.

import { useEffect } from "react";
import { sinais } from "@/components/cao/estado";

type Gsap = typeof import("gsap").gsap;
type Ferramentas = { gsap: Gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger };

let carregando: Promise<Ferramentas> | null = null;
function carregar() {
  carregando ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
  });
  return carregando;
}

const montagens: Record<string, (f: Ferramentas, secao: HTMLElement) => void | (() => void)> = {
  // 2. Plantão: a faixa atravessa a tela junto com o scroll.
  plantao({ gsap }, secao) {
    gsap.fromTo(
      secao.querySelector(".faixa"),
      { xPercent: 4 },
      { xPercent: -42, ease: "none", scrollTrigger: { trigger: secao, start: "top bottom", end: "bottom top", scrub: 0.4 } },
    );
  },

  // 3. Serviços: a linha que passa pelo meio da tela é sublinhada a caneta.
  servicos({ ScrollTrigger }, secao) {
    secao.querySelectorAll<HTMLElement>(".servico").forEach((linha) => {
      ScrollTrigger.create({ trigger: linha, start: "top 62%", end: "bottom 62%", toggleClass: { targets: linha, className: "ativa" } });
    });
  },

  // 4. Vacinas: a linha do tempo se desenha conforme o scroll e cada dose recebe o carimbo.
  vacinas({ gsap }, secao) {
    const horizontal = window.matchMedia("(min-width: 768px)").matches;
    const doses = [...secao.querySelectorAll<HTMLElement>(".dose")];
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: horizontal
        ? { trigger: secao, start: "top top", end: "bottom bottom", scrub: 0.25 }
        : { trigger: secao.querySelector(".trilho"), start: "top 75%", end: "bottom 60%", scrub: 0.25 },
    });
    tl.fromTo(secao.querySelector(".fio"), horizontal ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1 }, 0);
    doses.forEach((d, i) => {
      const quando = (i + 0.5) / doses.length;
      tl.from(d.querySelector(".cartao"), { scale: 1.9, autoAlpha: 0, duration: 0.03, ease: "power3.in" }, quando);
      tl.from(d.querySelectorAll(".marco, .haste, .idade"), { autoAlpha: 0, duration: 0.005 }, quando);
    });
    if (horizontal) {
      const pegadas = [...secao.querySelectorAll(".pegadas svg")];
      pegadas.forEach((p, i) => tl.from(p, { autoAlpha: 0, duration: 0.005 }, (i + 0.4) / (pegadas.length + 1)));
    }
  },

  // 5. Equipe: as fichas sobem do arquivo, uma depois da outra.
  equipe({ gsap }, secao) {
    gsap.from(secao.querySelectorAll(".arquivo > *"), {
      y: 160,
      rotation: (i) => (i % 2 ? 7 : -7),
      duration: 0.7,
      ease: "back.out(1.5)",
      stagger: 0.13,
      scrollTrigger: { trigger: secao.querySelector(".arquivo"), start: "top 82%" },
    });
  },

  // 6. Estrutura: a planta é traçada sala por sala.
  estrutura({ gsap }, secao) {
    gsap.fromTo(
      secao.querySelectorAll("rect.comodo"),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: secao.querySelector(".planta"), start: "top 80%", end: "center 45%", scrub: 0.3 } },
    );
  },

  // 7. Depoimentos: datilografados letra a letra. O texto inteiro continua lá para leitores de tela.
  depoimentos({ gsap }, secao) {
    const desfazer: (() => void)[] = [];
    secao.querySelectorAll<HTMLElement>(".datilo").forEach((p) => {
      const texto = p.textContent ?? "";
      const lido = document.createElement("span");
      lido.className = "sr-only";
      lido.textContent = texto;
      const visto = document.createElement("span");
      visto.setAttribute("aria-hidden", "true");
      const letras = [...texto].map((ch) => {
        const s = document.createElement("span");
        s.textContent = ch;
        visto.appendChild(s);
        return s;
      });
      p.replaceChildren(lido, visto);
      gsap.to(letras, { duration: 0.001, stagger: 0.022, className: "v", scrollTrigger: { trigger: p, start: "top 82%" } });
      desfazer.push(() => {
        p.textContent = texto;
      });
    });
    return () => desfazer.forEach((f) => f());
  },

  // 8. Blog: a pilha de fichas se abre em leque.
  blog({ gsap }, secao) {
    gsap.from(secao.querySelectorAll(".leque > *"), {
      xPercent: (i, _, todos) => (todos.length / 2 - 0.5 - i) * 85,
      rotation: (i, _, todos) => (i - (todos.length - 1) / 2) * 9,
      y: 60,
      ease: "none",
      scrollTrigger: { trigger: secao.querySelector(".leque"), start: "top 92%", end: "top 42%", scrub: 0.4 },
    });
  },

  // 9. Contato: o caminho até a clínica é desenhado e o pino bate no endereço.
  contato({ gsap }, secao) {
    const croqui = secao.querySelector(".croqui");
    gsap.fromTo(
      secao.querySelector(".rota"),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: croqui, start: "top 78%", end: "center 50%", scrub: 0.3 } },
    );
    gsap.from(secao.querySelector(".pino"), {
      scale: 0,
      transformOrigin: "50% 50%",
      duration: 0.35,
      ease: "back.out(3)",
      scrollTrigger: { trigger: croqui, start: "center 55%", toggleActions: "play none none reverse" },
    });
  },
};

export default function Coreografia() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let vivo = true;
    const desmontar: (() => void)[] = [];

    // 1. Abertura: quando o cachorro senta ao lado da última palavra, ela encolhe com o peso dele.
    const palavra = document.querySelector<HTMLElement>(".amassa");
    const aoPousar = async () => {
      if (!palavra || window.scrollY > window.innerHeight * 0.4) return;
      const { gsap } = await carregar();
      if (vivo) gsap.fromTo(palavra, { "--wdth": 80 }, { "--wdth": 50, duration: 1, ease: "elastic.out(1, 0.32)", overwrite: true });
    };
    sinais?.addEventListener("pousou", aoPousar);

    // As demais: cada seção é montada quando chega a uma tela de distância.
    const olho = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          olho.unobserve(e.target);
          const secao = e.target as HTMLElement;
          const montar = montagens[secao.dataset.anima ?? ""];
          if (!montar) continue;
          carregar().then((f) => {
            if (!vivo) return;
            let extra: void | (() => void);
            const ctx = f.gsap.context(() => {
              extra = montar(f, secao);
            }, secao);
            desmontar.push(() => {
              ctx.revert();
              extra?.();
            });
          });
        }
      },
      { rootMargin: "100% 0px" },
    );
    // Só começa a observar depois do primeiro gesto: quem não rola a página não baixa a biblioteca.
    const GESTOS = ["scroll", "pointermove", "touchstart", "keydown"] as const;
    const comecar = () => {
      GESTOS.forEach((g) => window.removeEventListener(g, comecar));
      document.querySelectorAll("[data-anima]").forEach((s) => olho.observe(s));
    };
    GESTOS.forEach((g) => window.addEventListener(g, comecar, { passive: true }));

    return () => {
      vivo = false;
      GESTOS.forEach((g) => window.removeEventListener(g, comecar));
      olho.disconnect();
      sinais?.removeEventListener("pousou", aoPousar);
      desmontar.forEach((f) => f());
    };
  }, []);

  return null;
}
