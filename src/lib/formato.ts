export const reais = (centavos: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(centavos / 100);

export const soDigitos = (s: string) => s.replace(/\D/g, "");

/** "(11) 98888-7777" a partir de dígitos, com ou sem o 55. */
export function fmtTelefone(s: string | null | undefined) {
  if (!s) return "";
  let d = soDigitos(s);
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return s;
}

/** Link do WhatsApp com mensagem pronta. Aceita o número com ou sem 55. */
export function linkWhatsApp(numero: string, mensagem: string) {
  let d = soDigitos(numero);
  if (d.length <= 11) d = "55" + d;
  return `https://wa.me/${d}?text=${encodeURIComponent(mensagem)}`;
}

export function fazerSlug(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const duracao = (min: number) => (min < 60 ? `${min} min` : min % 60 === 0 ? `${min / 60} h` : `${Math.floor(min / 60)} h ${min % 60}`);

export const NOMES_DIA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
export const DIAS_CURTOS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export type HorarioDia = { dia: number; abre: string; fecha: string };

/** Agrupa dias seguidos com o mesmo horário: "seg–sex 8h–20h". */
export function resumirHorarios(horarios: HorarioDia[]) {
  const h = (s: string) => s.replace(":00", "h").replace(/^0/, "").replace(":", "h");
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const grupos: { de: number; ate: number; texto: string }[] = [];
  for (const dia of ordem) {
    const x = horarios.find((i) => i.dia === dia);
    if (!x) continue;
    const texto = `${h(x.abre)}–${h(x.fecha)}`;
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.texto === texto && ordem.indexOf(ultimo.ate) === ordem.indexOf(dia) - 1) ultimo.ate = dia;
    else grupos.push({ de: dia, ate: dia, texto });
  }
  return grupos.map((g) => `${g.de === g.ate ? DIAS_CURTOS[g.de] : `${DIAS_CURTOS[g.de]}–${DIAS_CURTOS[g.ate]}`} ${g.texto}`);
}
