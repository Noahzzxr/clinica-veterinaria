// Estado compartilhado entre a página (DOM) e o cachorro (WebGL).
// É um objeto mutável lido a cada quadro: nada aqui dispara renderização do React.

export type NomePose =
  | "sentado"
  | "emPe"
  | "alerta"
  | "farejando"
  | "andando"
  | "olhandoCima"
  | "barrigaCima"
  | "deitado"
  | "dormindo"
  | "cavando";

/** O que uma seção pede ao cachorro. x e y são frações da janela (0–1) do ponto onde ele pisa. */
export type Cena = {
  pose: NomePose;
  x: number;
  y: number;
  /** 1 = cerca de 38% da altura da janela. */
  escala?: number;
  /** Giro em radianos. Negativo vira para a esquerda da tela. */
  giro?: number;
  /** Se presente, x vai de x até xAte conforme a seção rola. Com âncora, são frações da largura dela. */
  xAte?: number;
  /** Com xAte: mede o progresso como em uma seção com quadro fixo (sticky). */
  fixa?: boolean;
  /** Seletor de um elemento da seção sobre o qual ele pisa (substitui x e y). */
  ancora?: string;
  /** Ponto dentro da âncora: 0–1 na horizontal e na vertical. */
  ax?: number;
  ay?: number;
  /** Ajustes para telas estreitas. */
  movel?: Partial<Pick<Cena, "x" | "y" | "escala" | "giro">>;
};

export const CENA_PADRAO: Required<Pick<Cena, "pose" | "x" | "y" | "escala" | "giro">> = {
  pose: "sentado",
  x: 0.88,
  y: 0.97,
  escala: 0.5,
  giro: -0.55,
};

export const cao = {
  ponteiro: { x: 0.5, y: 0.4, visto: false },
  cena: { ...CENA_PADRAO },
  /** Troca de identidade quando a seção ativa muda: é o que faz ele caminhar até o novo lugar. */
  cenaId: null as object | null,
  sobreClicavel: false,
  abanaAte: 0,
  ultimoGesto: 0,
  dormindo: false,
  movel: false,
};

export const sinais: EventTarget | null = typeof window === "undefined" ? null : new EventTarget();

/** Atributo para marcar uma seção: <section {...cena({ pose: "farejando", x: .8, y: .9 })}> */
export function cena(c: Cena) {
  return { "data-cao": JSON.stringify(c) };
}
