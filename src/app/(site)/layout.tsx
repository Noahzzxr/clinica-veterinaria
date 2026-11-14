import type { Metadata } from "next";
import Palco from "@/components/cao/Palco";
import Cursor from "@/components/site/Cursor";
import { BarraPlantao, Cabecalho, Rodape } from "@/components/site/Moldura";
import { obterClinica } from "@/lib/dados";
import "./site.css";

export async function generateMetadata(): Promise<Metadata> {
  const c = await obterClinica();
  const titulo = `${c.nome} · Clínica veterinária em ${c.unidade.cidade}`;
  const descricao = `Consulta, vacina, cirurgia, internação, banho e hotel em ${c.unidade.cidade}, ${c.unidade.uf}. Plantão 24 horas e agendamento online.`;
  return {
    title: { default: titulo, template: `%s · ${c.nome}` },
    description: descricao,
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: "pt_BR", siteName: c.nome, title: titulo, description: descricao },
    robots: { index: true, follow: true },
  };
}

export default function LayoutSite({ children }: LayoutProps<"/">) {
  return (
    <>
      <a href="#conteudo" className="carimbo sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-12 focus:z-[90]">
        Pular para o conteúdo
      </a>
      <BarraPlantao />
      <Cabecalho />
      <div id="conteudo">{children}</div>
      <Rodape />
      <Palco />
      <Cursor />
    </>
  );
}
