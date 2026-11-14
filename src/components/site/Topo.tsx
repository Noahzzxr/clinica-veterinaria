import type { ReactNode } from "react";
import { cena, type NomePose } from "@/components/cao/estado";

/** Cabeça das páginas internas: rótulo, título de cartaz e a pose do cachorro para a página. */
export default function Topo({
  rotulo,
  titulo,
  children,
  pose = "sentado",
  escala = 0.72,
}: {
  rotulo: ReactNode;
  titulo: string;
  children?: ReactNode;
  pose?: NomePose;
  escala?: number;
}) {
  return (
    <header className="dentro pb-14 pt-8 lg:pb-20 lg:pt-12" {...cena({ pose, x: 0.93, y: 0.96, escala, giro: -0.7 })}>
      <p className="rotulo">{rotulo}</p>
      <h1 className="letreiro titulo-pagina mt-3 text-balance">{titulo}</h1>
      {children && <div className="medida mt-8 text-xl leading-snug lg:ml-[34%]">{children}</div>}
    </header>
  );
}
