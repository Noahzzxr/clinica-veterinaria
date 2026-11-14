"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { soDigitos } from "@/lib/formato";
import { dentroDoLimite } from "@/lib/limite";

const Recado = z
  .object({
    nome: z.string().trim().min(2, "Informe seu nome.").max(120),
    email: z.union([z.literal(""), z.email("E-mail inválido.")]),
    telefone: z.string().transform(soDigitos).refine((d) => d === "" || d.length === 10 || d.length === 11, "Telefone com DDD."),
    mensagem: z.string().trim().min(10, "Escreva um pouco mais.").max(2000),
    site: z.string().max(0),
  })
  .refine((r) => r.email || r.telefone, { path: ["email"], message: "Deixe um e-mail ou um telefone para a resposta." });

export type EstadoContato = { ok?: boolean; erro?: string; campos?: Record<string, string> };

export async function enviarContato(_: EstadoContato, f: FormData): Promise<EstadoContato> {
  const lido = Recado.safeParse({
    nome: f.get("nome") ?? "",
    email: f.get("email") ?? "",
    telefone: f.get("telefone") ?? "",
    mensagem: f.get("mensagem") ?? "",
    site: f.get("site") ?? "",
  });
  if (!lido.success) {
    const campos: Record<string, string> = {};
    for (const i of lido.error.issues) campos[String(i.path[0])] ??= i.message;
    return { erro: "Confira os campos marcados.", campos };
  }
  if (!(await dentroDoLimite("contato", 4, 10 * 60_000))) return { erro: "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos." };
  const { nome, email, telefone, mensagem } = lido.data;
  await db.contatoRecebido.create({ data: { nome, email: email || null, telefone: telefone || null, mensagem } });
  return { ok: true };
}
