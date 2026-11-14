import type { Metadata } from "next";
import { FichaVet } from "@/components/home/secoes";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarEquipe } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Veterinários da clínica, com CRMV e especialidades. Escolha com quem agendar.",
  alternates: { canonical: "/equipe" },
};

export default async function Equipe() {
  const equipe = await listarEquipe();
  const giros = [-1.6, 1.1, -0.7, 1.4];
  return (
    <Ficha>
      <main>
        <Topo rotulo="Equipe" titulo="Quem cuida" pose="olhandoCima">
          <p>Cada veterinário tem a sua especialidade e a sua agenda. As fotos entram quando a clínica enviar os retratos da equipe.</p>
        </Topo>
        <div className="dentro grid gap-x-8 gap-y-20 pb-32 pt-8 md:grid-cols-2 lg:mr-[14%] lg:grid-cols-3">
          {equipe.map((p, i) => (
            <FichaVet key={p.id} p={p} giro={giros[i % giros.length]} />
          ))}
        </div>
      </main>
    </Ficha>
  );
}
