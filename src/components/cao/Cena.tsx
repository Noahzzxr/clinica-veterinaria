"use client";

import { Canvas } from "@react-three/fiber";
import Cao from "./Cao";
import { cao } from "./estado";

/** A cena WebGL. Carregada sob demanda pelo Palco, nunca no servidor. */
export default function Cena({ aoIniciar }: { aoIniciar: () => void }) {
  return (
    <Canvas
      flat
      dpr={cao.movel ? [1, 1.5] : [1, 2]}
      camera={{ fov: 22, position: [0, 0, 14], near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={aoIniciar}
      aria-hidden
    >
      <hemisphereLight args={["#fff6e8", "#b98a5e", 1.5]} />
      <directionalLight position={[4, 7, 9]} intensity={1.9} />
      <Cao />
    </Canvas>
  );
}
