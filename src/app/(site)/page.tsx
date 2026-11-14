import Coreografia from "@/components/home/Coreografia";
import { Abertura, Blog, Contato, Depoimentos, Equipe, Estrutura, Plantao, Servicos, Vacinas } from "@/components/home/secoes";
import DadosEstruturados from "@/components/site/DadosEstruturados";
import Ficha from "@/components/site/Ficha";
import { listarAmbientes, listarDepoimentos, listarEquipe, listarPosts, listarProtocolos, listarServicos, obterClinica } from "@/lib/dados";

export default async function Inicio() {
  const [clinica, servicos, protocolos, equipe, ambientes, depoimentos, posts] = await Promise.all([
    obterClinica(),
    listarServicos(),
    listarProtocolos(),
    listarEquipe(),
    listarAmbientes(),
    listarDepoimentos(),
    listarPosts(3),
  ]);
  return (
    <Ficha>
      <main>
        <Abertura clinica={clinica} />
        <Plantao clinica={clinica} />
        <Servicos servicos={servicos} />
        <Vacinas protocolos={protocolos} />
        <Equipe equipe={equipe} />
        <Estrutura ambientes={ambientes} />
        <Depoimentos depoimentos={depoimentos} exemplo={clinica.dadosDeExemplo} />
        <Blog posts={posts} />
        <Contato clinica={clinica} />
        <Coreografia />
        <DadosEstruturados clinica={clinica} />
      </main>
    </Ficha>
  );
}
