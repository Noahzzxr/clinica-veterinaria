import { notFound } from "next/navigation";
import { Suspense } from "react";
import Palco from "@/components/cao/Palco";
import type { NomePose } from "@/components/cao/estado";

// Página de bancada: mostra uma pose do cachorro em tamanho grande para conferência visual.
// /dev/cao?pose=sentado&giro=-0.6
async function Bancada({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  // Bancada de desenvolvimento: não existe em produção.
  if (process.env.NODE_ENV === "production") notFound();
  const q = await searchParams;
  const pose = (q.pose ?? "sentado") as NomePose;
  const giro = Number(q.giro ?? -0.6);
  const escala = Number(q.escala ?? 1.9);
  return (
    <main
      className="h-dvh"
      data-cao={JSON.stringify({ pose, x: 0.5, y: 0.86, escala, giro, movel: { x: 0.5, y: 0.86, escala, giro } })}
    >
      <p className="rotulo p-4">
        bancada · {pose} · giro {giro}
      </p>
      <div className="absolute inset-x-0 top-[86%] border-t border-regua" />
    </main>
  );
}

export default function Pagina(props: { searchParams: Promise<Record<string, string | undefined>> }) {
  return (
    <>
      <Suspense>
        <Bancada {...props} />
      </Suspense>
      <Palco />
    </>
  );
}
