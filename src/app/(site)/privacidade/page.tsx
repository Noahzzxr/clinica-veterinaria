import type { Metadata } from "next";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { obterClinica } from "@/lib/dados";
import { Texto } from "@/lib/texto";

export const metadata: Metadata = {
  title: "Privacidade e seus dados",
  description: "Quais dados a clínica guarda, para quê, por quanto tempo e como pedir cópia ou exclusão.",
  alternates: { canonical: "/privacidade" },
};

// Texto-base da política. Antes de publicar, a clínica deve revisar com quem responde pela LGPD
// e preencher o nome do encarregado.
const politica = (clinica: string, email: string) => `Esta página explica, em linguagem direta, o que a ${clinica} faz com os seus dados e os do seu animal.

## O que guardamos

- **Do tutor:** nome, telefone, e-mail, endereço e CPF, quando informado
- **Do animal:** nome, espécie, raça, idade, peso, alergias, microchip e todo o histórico clínico
- **Do atendimento:** agendamentos, prontuário, receitas, exames, vacinas, pagamentos

## Para que usamos

- Atender o seu animal e manter o prontuário, como exige a profissão
- Avisar sobre consultas, retornos e reforço de vacinas
- Emitir cobranças e documentos fiscais
- Enviar novidades, só se você autorizar. Essa autorização é separada e pode ser retirada a qualquer momento

## Com quem compartilhamos

Com laboratórios e especialistas envolvidos no tratamento, com os serviços que enviam mensagens e processam pagamentos em nosso nome, e com autoridades quando a lei exige. Não vendemos dados.

## Por quanto tempo

O prontuário é guardado pelo prazo que a legislação veterinária determina. Dados de cobrança seguem os prazos fiscais. O restante é apagado quando deixa de ser necessário.

## Seus direitos

- Ver e receber uma cópia dos seus dados
- Corrigir o que estiver errado
- Retirar o consentimento para comunicações
- Pedir a exclusão. Quando a lei obriga a manter o prontuário, os seus dados pessoais são desvinculados dele

Quem tem acesso ao portal do tutor faz esses pedidos em **Conta**. Sem portal, escreva para **${email}**.

## Segurança

O acesso da equipe exige senha e segundo fator. Toda consulta e toda alteração em prontuário ficam registradas em um log que não pode ser editado.`;

export default async function Privacidade() {
  const c = await obterClinica();
  return (
    <Ficha>
      <main>
        <Topo rotulo="LGPD · versão 2026-11" titulo="Seus dados" pose="sentado">
          <p>O que a clínica guarda, para quê, por quanto tempo e como pedir cópia ou exclusão.</p>
        </Topo>
        <div className="dentro pb-28 lg:pl-[calc(34%+clamp(16px,4vw,56px)*0.3)]">
          {c.dadosDeExemplo && (
            <p className="selo selo-alerta mb-8 !whitespace-normal !text-[12px] !leading-snug">
              Texto-base: revisar com o responsável pela LGPD antes de publicar
            </p>
          )}
          <Texto fonte={politica(c.razaoSocial ?? c.nome, c.email ?? "o e-mail da clínica")} />
        </div>
      </main>
    </Ficha>
  );
}
