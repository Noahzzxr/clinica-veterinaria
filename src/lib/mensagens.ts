// Fila de saída de mensagens. Tudo que a clínica envia passa por aqui e fica registrado.
// Sem provedor configurado, a mensagem entra como AGUARDANDO_CONFIGURACAO: nunca aparece como enviada.
import type { Canal, Prisma } from "@prisma/client";
import { provedorEmail } from "@/integracoes/email";
import { provedorWhatsApp } from "@/integracoes/whatsapp";

export const provedorDo = (canal: Canal) => (canal === "WHATSAPP" ? provedorWhatsApp : provedorEmail);

/** Troca {chaves} do modelo pelos valores. */
export function preencher(modelo: string, valores: Record<string, string>) {
  return modelo.replace(/\{(\w+)\}/g, (_, chave: string) => valores[chave] ?? "");
}

export async function enfileirar(
  tx: Prisma.TransactionClient,
  m: {
    canal: Canal;
    destino: string;
    corpo: string;
    assunto?: string;
    tutorId?: string;
    agendamentoId?: string;
    campanhaId?: string;
    agendadaPara?: Date;
    chaveUnica?: string;
  },
) {
  return tx.mensagem.create({
    data: { ...m, status: provedorDo(m.canal).configurado() ? "PENDENTE" : "AGUARDANDO_CONFIGURACAO" },
  });
}
