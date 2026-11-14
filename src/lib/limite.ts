import { headers } from "next/headers";

// Limite de envios por endereço, em memória. Basta para um servidor único;
// com várias instâncias, troque por um contador no banco.
const baldes = new Map<string, number[]>();

export async function ipDoPedido() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

/** Verdadeiro se o pedido pode seguir; falso se passou do limite na janela. */
export async function dentroDoLimite(chave: string, maximo: number, janelaMs: number) {
  const ip = await ipDoPedido();
  const id = `${chave}:${ip}`;
  const agora = Date.now();
  const recentes = (baldes.get(id) ?? []).filter((t) => agora - t < janelaMs);
  if (recentes.length >= maximo) {
    baldes.set(id, recentes);
    return false;
  }
  recentes.push(agora);
  baldes.set(id, recentes);
  return true;
}
