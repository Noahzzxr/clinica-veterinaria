// Datas e horas no fuso da clínica. O banco guarda UTC; tudo que é "dia" ou "hora do relógio"
// passa por aqui. O Brasil não tem horário de verão desde 2019, então o deslocamento é fixo.
export const FUSO = "America/Sao_Paulo";
const DESLOCAMENTO = "-03:00";

const dois = (n: number) => String(n).padStart(2, "0");

/** "2026-11-14" + 510 minutos → instante de 08:30 no fuso da clínica. */
export function instante(data: string, minutos: number) {
  return new Date(`${data}T${dois(Math.floor(minutos / 60))}:${dois(minutos % 60)}:00${DESLOCAMENTO}`);
}

/** Data do calendário (AAAA-MM-DD) de um instante, no fuso da clínica. */
export function dataLocal(d: Date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }).format(d);
}

/** Minutos desde a meia-noite, no fuso da clínica. */
export function minutosLocais(d: Date) {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: FUSO, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
  const h = Number(p.find((x) => x.type === "hour")?.value ?? 0);
  const m = Number(p.find((x) => x.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** 0 = domingo. */
export function diaDaSemana(data: string) {
  return new Date(`${data}T12:00:00${DESLOCAMENTO}`).getUTCDay();
}

export function somarDias(data: string, n: number) {
  const d = new Date(`${data}T12:00:00${DESLOCAMENTO}`);
  d.setUTCDate(d.getUTCDate() + n);
  return dataLocal(d);
}

export function dataValida(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(new Date(`${s}T12:00:00${DESLOCAMENTO}`).getTime());
}

export const horaDeMinutos = (min: number) => `${dois(Math.floor(min / 60))}:${dois(min % 60)}`;

export const fmtHora = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, hour: "2-digit", minute: "2-digit" }).format(d);

export const fmtData = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, day: "2-digit", month: "2-digit", year: "numeric" }).format(d);

export const fmtDataLonga = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, weekday: "long", day: "numeric", month: "long" }).format(d);

export const fmtDiaCurto = (data: string) => {
  const d = new Date(`${data}T12:00:00${DESLOCAMENTO}`);
  const sem = new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, weekday: "short" }).format(d).replace(".", "");
  const dia = new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, day: "2-digit", month: "2-digit" }).format(d);
  return { sem, dia };
};

export const fmtMesAno = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: FUSO, month: "long", year: "numeric" }).format(d);
