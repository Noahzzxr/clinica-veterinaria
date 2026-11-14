"use client";

import { useActionState } from "react";
import { enviarContato, type EstadoContato } from "@/app/(site)/contato/acoes";

export default function FormContato() {
  const [estado, acao, enviando] = useActionState<EstadoContato, FormData>(enviarContato, {});
  const e = estado.campos ?? {};

  if (estado.ok) {
    return (
      <div role="status" className="border-2 border-focinho p-6">
        <p className="letreiro text-[64px] [--wdth:64]">Recebido.</p>
        <p className="mt-3 text-lg">A recepção responde no próximo horário de atendimento. Se for urgente, use o plantão.</p>
      </div>
    );
  }

  return (
    <form action={acao} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="campo sm:col-span-2">
        <label htmlFor="c-nome">Seu nome</label>
        <input id="c-nome" name="nome" autoComplete="name" required aria-invalid={!!e.nome} aria-describedby={e.nome ? "ce-nome" : undefined} />
        {e.nome && <p id="ce-nome" className="erro">{e.nome}</p>}
      </div>
      <div className="campo">
        <label htmlFor="c-email">E-mail</label>
        <input id="c-email" name="email" type="email" autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "ce-email" : undefined} />
        {e.email && <p id="ce-email" className="erro">{e.email}</p>}
      </div>
      <div className="campo">
        <label htmlFor="c-telefone">Telefone com DDD</label>
        <input id="c-telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel-national" aria-invalid={!!e.telefone} aria-describedby={e.telefone ? "ce-telefone" : undefined} />
        {e.telefone && <p id="ce-telefone" className="erro">{e.telefone}</p>}
      </div>
      <div className="campo sm:col-span-2">
        <label htmlFor="c-mensagem">Mensagem</label>
        <textarea id="c-mensagem" name="mensagem" required maxLength={2000} aria-invalid={!!e.mensagem} aria-describedby={e.mensagem ? "ce-mensagem" : undefined} />
        {e.mensagem && <p id="ce-mensagem" className="erro">{e.mensagem}</p>}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="c-site">Não preencha</label>
        <input id="c-site" name="site" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" className="carimbo" disabled={enviando} data-abana>
          {enviando ? "Enviando…" : "Enviar mensagem"} <span aria-hidden>→</span>
        </button>
        <p role="alert" className="font-bold">
          {estado.erro ?? ""}
        </p>
      </div>
    </form>
  );
}
