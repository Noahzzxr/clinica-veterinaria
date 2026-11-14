/** Contrato de um provedor de mensagens. Trocar de fornecedor é escrever outro arquivo com este formato. */
export type Provedor = {
  nome: string;
  /** Verdadeiro quando as credenciais estão no ambiente. */
  configurado(): boolean;
  enviar(m: { destino: string; assunto?: string | null; corpo: string }): Promise<{ id: string }>;
};
