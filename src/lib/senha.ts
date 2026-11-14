import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const derivar = promisify(scrypt) as (senha: string, sal: Buffer, tamanho: number) => Promise<Buffer>;

/** Hash de senha com scrypt (nativo do Node). Formato: scrypt$<sal>$<hash>, em base64url. */
export async function gerarHash(senha: string) {
  const sal = randomBytes(16);
  const hash = await derivar(senha.normalize("NFKC"), sal, 64);
  return `scrypt$${sal.toString("base64url")}$${hash.toString("base64url")}`;
}

export async function conferirSenha(senha: string, guardado: string) {
  const [alg, sal, hash] = guardado.split("$");
  if (alg !== "scrypt" || !sal || !hash) return false;
  const esperado = Buffer.from(hash, "base64url");
  const obtido = await derivar(senha.normalize("NFKC"), Buffer.from(sal, "base64url"), esperado.length);
  return timingSafeEqual(esperado, obtido);
}
