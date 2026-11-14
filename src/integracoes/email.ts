// Integração isolada: e-mail transacional pela API do Resend.
// Para ativar, defina no .env:
//   RESEND_API_KEY   chave da API
//   EMAIL_REMETENTE  ex.: "Clínica <contato@seudominio.com.br>" (domínio verificado no Resend)
// Sem essas variáveis, nada é enviado e as mensagens ficam na fila como AGUARDANDO_CONFIGURACAO.
import type { Provedor } from "./tipos";

export const provedorEmail: Provedor = {
  nome: "resend",
  configurado: () => !!process.env.RESEND_API_KEY && !!process.env.EMAIL_REMETENTE,
  async enviar({ destino, assunto, corpo }) {
    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.EMAIL_REMETENTE, to: [destino], subject: assunto ?? "Aviso da clínica", text: corpo }),
    });
    const json = (await resposta.json().catch(() => null)) as { id?: string; message?: string } | null;
    if (!resposta.ok) throw new Error(json?.message ?? `Resend respondeu ${resposta.status}`);
    return { id: json?.id ?? "" };
  },
};
