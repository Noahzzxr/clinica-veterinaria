// Integração isolada: WhatsApp pela Cloud API da Meta.
// Para ativar, defina no .env:
//   WHATSAPP_TOKEN     token de acesso permanente do app
//   WHATSAPP_PHONE_ID  identificador do número remetente
// Sem essas variáveis, nada é enviado e as mensagens ficam na fila como AGUARDANDO_CONFIGURACAO.
// Observação: mensagens iniciadas pela clínica fora da janela de 24 h exigem modelos aprovados pela Meta.
import type { Provedor } from "./tipos";

export const provedorWhatsApp: Provedor = {
  nome: "whatsapp-cloud",
  configurado: () => !!process.env.WHATSAPP_TOKEN && !!process.env.WHATSAPP_PHONE_ID,
  async enviar({ destino, corpo }) {
    const resposta = await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to: destino, type: "text", text: { body: corpo } }),
    });
    const json = (await resposta.json().catch(() => null)) as { messages?: { id: string }[]; error?: { message: string } } | null;
    if (!resposta.ok) throw new Error(json?.error?.message ?? `WhatsApp respondeu ${resposta.status}`);
    return { id: json?.messages?.[0]?.id ?? "" };
  },
};
