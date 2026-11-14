"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "transitionTypes" | "prefetch"> & {
  /** Marca o link como "voltar": a ficha desliza no sentido contrário. */
  volta?: boolean;
};

/**
 * Link interno do site. Toda navegação desliza a ficha atual para fora e traz a próxima.
 * A página de destino só é pré-carregada quando o visitante mostra intenção (cursor, foco ou toque),
 * em vez de pré-carregar todo link que aparece na tela.
 */
export default function Elo({ volta, onMouseEnter, onFocus, onTouchStart, ...props }: Props) {
  const [quer, setQuer] = useState(false);
  return (
    <Link
      {...props}
      prefetch={quer ? null : false}
      transitionTypes={[volta ? "volta" : "avanca"]}
      onMouseEnter={(e) => {
        setQuer(true);
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        setQuer(true);
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        setQuer(true);
        onTouchStart?.(e);
      }}
    />
  );
}
