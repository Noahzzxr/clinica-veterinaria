import type { Metadata } from "next";
import DadosEstruturados from "@/components/site/DadosEstruturados";
import Ficha from "@/components/site/Ficha";
import FormContato from "@/components/site/FormContato";
import Mapa from "@/components/site/Mapa";
import Topo from "@/components/site/Topo";
import { obterClinica } from "@/lib/dados";
import { fmtTelefone, linkWhatsApp, NOMES_DIA } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Contato",
  description: "Endereço, mapa, horários, telefone e WhatsApp da clínica.",
  alternates: { canonical: "/contato" },
};

export default async function Contato() {
  const clinica = await obterClinica();
  const u = clinica.unidade;
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  return (
    <Ficha>
      <main>
        <Topo rotulo={`Contato · ${u.cidade}, ${u.uf}`} titulo="Vem cá" pose="cavando" escala={0.58}>
          <p>
            {u.endereco}, {u.bairro}. {u.cep ? `CEP ${u.cep}.` : ""}
          </p>
          <p className="mt-5 flex flex-wrap gap-x-6 gap-y-4">
            <a href={linkWhatsApp(u.whatsapp ?? "", "Olá! Vim pelo site.")} target="_blank" rel="noopener" className="carimbo" data-abana>
              WhatsApp
            </a>
            <a
              href={`https://www.openstreetmap.org/directions?to=${u.latitude}%2C${u.longitude}`}
              target="_blank"
              rel="noopener"
              className="carimbo carimbo-vazado"
            >
              Traçar rota
            </a>
          </p>
        </Topo>
        <div className="dentro grid gap-x-14 gap-y-14 pb-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {u.latitude != null && u.longitude != null && <Mapa lat={u.latitude} lng={u.longitude} rotulo={`${clinica.nome}, ${u.endereco}`} />}
          </div>
          <div className="lg:col-span-5 lg:mr-[30%]">
            <h2 className="rotulo border-b-2 border-focinho pb-2">Horários</h2>
            <table className="mono w-full text-base">
              <tbody>
                {ordem.map((dia) => {
                  const h = u.horarios.find((x) => x.dia === dia);
                  return (
                    <tr key={dia} className="border-b border-regua">
                      <th scope="row" className="py-2 text-left font-semibold">
                        {NOMES_DIA[dia]}
                      </th>
                      <td className="py-2 text-right">{h ? `${h.abre} – ${h.fecha}` : u.plantao24h ? "só plantão" : "fechado"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {u.plantao24h && <p className="mt-3 text-[15px]">Fora desses horários, o plantão atende emergências 24 horas.</p>}
            <h2 className="rotulo mt-10 border-b-2 border-focinho pb-2">Telefones</h2>
            <dl className="mono grid grid-cols-[7rem_1fr] gap-y-2 py-3 text-base">
              <dt className="font-semibold">Recepção</dt>
              <dd>{fmtTelefone(u.telefone)}</dd>
              <dt className="font-semibold">WhatsApp</dt>
              <dd>{fmtTelefone(u.whatsapp)}</dd>
              <dt className="font-semibold">Plantão</dt>
              <dd>{fmtTelefone(clinica.whatsappPlantao)}</dd>
              {clinica.email && (
                <>
                  <dt className="font-semibold">E-mail</dt>
                  <dd className="break-all">{clinica.email}</dd>
                </>
              )}
            </dl>
          </div>
          <section aria-labelledby="t-escreva" className="lg:col-span-7">
            <h2 id="t-escreva" className="letreiro mb-8 text-[clamp(44px,6vw,88px)]">
              Escreva
            </h2>
            <FormContato />
          </section>
        </div>
        <DadosEstruturados clinica={clinica} />
      </main>
    </Ficha>
  );
}
