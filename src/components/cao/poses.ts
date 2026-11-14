import type { NomePose } from "./estado";

// Cada pose é um conjunto de ângulos (radianos) das juntas do esqueleto.
// O cachorro olha para +Z. Rotação X negativa levanta a frente; nas pernas, negativa leva a pata à frente.
export type Pose = {
  /** Altura do quadril. */
  y: number;
  /** Inclinação do tronco (negativo = frente para cima). */
  inclina: number;
  /** Rolagem do tronco (3 ≈ de barriga para cima). */
  rola: number;
  pesc: number;
  cab: number;
  cabZ: number;
  ombro: number;
  cotovelo: number;
  abreF: number;
  quadril: number;
  joelho: number;
  abreT: number;
  rabo: number;
  curva: number;
  /** -1 caídas, 0 uma em pé e uma dobrada, 1 em pé. */
  orelha: number;
  /** 0 fechada, 1 aberta com a língua de fora. */
  boca: number;
  /** 0 fechado, 1 aberto. */
  olho: number;
  /** 1 mantém as patas planas no chão. */
  nivela: number;
  /** Quanto ele acompanha o cursor com a cabeça. */
  olha: number;
  /** Raio da sombra no chão. */
  sombra: number;
};

export const CHAVES = [
  "y",
  "inclina",
  "rola",
  "pesc",
  "cab",
  "cabZ",
  "ombro",
  "cotovelo",
  "abreF",
  "quadril",
  "joelho",
  "abreT",
  "rabo",
  "curva",
  "orelha",
  "boca",
  "olho",
  "nivela",
  "olha",
  "sombra",
] as const satisfies readonly (keyof Pose)[];

const emPe: Pose = {
  y: 0.93,
  inclina: -0.04,
  rola: 0,
  pesc: 0.6,
  cab: -0.52,
  cabZ: 0,
  ombro: 0,
  cotovelo: 0,
  abreF: 0,
  quadril: -0.3,
  joelho: 0.6,
  abreT: 0,
  rabo: -0.7,
  curva: 0.32,
  orelha: 0,
  boca: 0.7,
  olho: 1,
  nivela: 1,
  olha: 1,
  sombra: 0.8,
};

const sentado: Pose = {
  ...emPe,
  y: 0.3,
  inclina: -0.55,
  pesc: 0.72,
  cab: -0.2,
  ombro: 0.05,
  cotovelo: 0,
  quadril: -1.05,
  joelho: 2.5,
  abreT: 0.32,
  rabo: -1.05,
  curva: -0.04,
  boca: 0.8,
  sombra: 0.7,
};

const deitado: Pose = {
  ...emPe,
  y: 0.24,
  inclina: 0,
  pesc: 1.72,
  cab: -1.6,
  ombro: -1.5,
  cotovelo: 0,
  abreF: 0.12,
  quadril: -1.25,
  joelho: 2.3,
  abreT: 0.36,
  rabo: -1.5,
  curva: 0.02,
  orelha: -0.3,
  boca: 0,
  olho: 0.9,
  olha: 0.35,
  sombra: 0.95,
};

export const POSES: Record<NomePose, Pose> = {
  emPe,
  sentado,
  deitado,
  andando: { ...emPe, pesc: 0.72, cab: -0.66, boca: 0.75, olha: 0.25 },
  alerta: { ...emPe, pesc: 0.28, cab: -0.26, orelha: 1, boca: 0, rabo: -0.25, curva: 0.08, olha: 0.6 },
  farejando: {
    ...emPe,
    y: 0.93,
    inclina: 0.2,
    pesc: 1.6,
    cab: -0.7,
    ombro: -1.0,
    cotovelo: 0,
    rabo: -0.5,
    curva: 0.25,
    boca: 0,
    olha: 0,
  },
  cavando: {
    ...emPe,
    y: 0.93,
    inclina: 0.2,
    pesc: 1.35,
    cab: -0.65,
    ombro: -0.85,
    cotovelo: 0.35,
    rabo: -0.4,
    curva: 0.2,
    boca: 0.5,
    olha: 0,
  },
  olhandoCima: { ...sentado, pesc: 0.42, cab: -0.62, orelha: 0.5, boca: 0.9, olha: 0.25 },
  dormindo: { ...deitado, pesc: 1.8, cabZ: 0.28, orelha: -1, olho: 0, olha: 0 },
  barrigaCima: {
    ...emPe,
    y: 0.4,
    inclina: 0,
    rola: 3.0,
    pesc: 2.0,
    cab: -1.95,
    cabZ: 0.4,
    ombro: -0.7,
    cotovelo: 1.5,
    abreF: 0.3,
    quadril: -0.5,
    joelho: 1.6,
    abreT: 0.5,
    rabo: -1.3,
    curva: 0,
    orelha: -0.6,
    boca: 1,
    nivela: 0,
    olha: 0.2,
    sombra: 0.9,
  },
};
