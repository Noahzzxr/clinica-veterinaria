"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Elo from "./Elo";
import { ROTAS } from "./rotas";

/** Navegação. Em tela larga é uma linha; em tela estreita abre em folha inteira, em letra de cartaz. */
export default function Menu() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", fechar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fechar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const atual = (href: string) => (caminho === href || caminho.startsWith(href + "/") ? "page" : undefined);

  return (
    <>
      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-7 text-[15px] font-medium">
          {ROTAS.map((r) => (
            <li key={r.href}>
              <Elo href={r.href} className="traco" aria-current={atual(r.href)}>
                {r.nome}
              </Elo>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="rotulo border-2 border-focinho px-3 py-2 lg:hidden"
        aria-expanded={aberto}
        aria-controls="menu-folha"
        onClick={() => setAberto((v) => !v)}
      >
        {aberto ? "Fechar" : "Menu"}
      </button>

      {aberto && (
        <nav
          id="menu-folha"
          aria-label="Principal"
          className="fixed inset-0 top-9 z-[60] flex flex-col justify-between overflow-y-auto bg-osso px-4 pb-8 pt-20 lg:hidden"
        >
          <button type="button" className="rotulo absolute right-4 top-5 border-2 border-focinho px-3 py-2" onClick={() => setAberto(false)}>
            Fechar
          </button>
          <ul>
            {[{ href: "/", nome: "Início" }, ...ROTAS].map((r) => (
              <li key={r.href} className="pauta">
                <Elo
                  href={r.href}
                  onClick={() => setAberto(false)}
                  className="letreiro block py-3 text-[15vw] active:translate-x-2"
                  aria-current={r.href !== "/" ? atual(r.href) : undefined}
                >
                  {r.nome}
                </Elo>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Elo href="/agendar" className="carimbo" onClick={() => setAberto(false)}>
              Agendar
            </Elo>
          </div>
        </nav>
      )}
    </>
  );
}
