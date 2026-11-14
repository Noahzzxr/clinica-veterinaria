import { ViewTransition, type ReactNode } from "react";

const mapa = { avanca: "ficha-avanca", volta: "ficha-volta", default: "none" } as const;

/** Envolve o conteúdo de cada página: é a "ficha" que desliza na troca de rota. */
export default function Ficha({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={mapa} exit={mapa} default="none">
      {children}
    </ViewTransition>
  );
}
