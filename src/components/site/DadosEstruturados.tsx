import type { obterClinica } from "@/lib/dados";
import { soDigitos } from "@/lib/formato";

const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Dados estruturados (schema.org) da clínica, para busca local. */
export default function DadosEstruturados({ clinica }: { clinica: Awaited<ReturnType<typeof obterClinica>> }) {
  const u = clinica.unidade;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const dados = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${base}/#clinica`,
    name: clinica.nome,
    url: base,
    telephone: u.telefone ? `+55${soDigitos(u.telefone)}` : undefined,
    email: clinica.email ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: u.endereco,
      addressLocality: u.cidade,
      addressRegion: u.uf,
      postalCode: u.cep ?? undefined,
      addressCountry: "BR",
    },
    geo: u.latitude && u.longitude ? { "@type": "GeoCoordinates", latitude: u.latitude, longitude: u.longitude } : undefined,
    openingHoursSpecification: u.horarios.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DIAS[h.dia],
      opens: h.abre,
      closes: h.fecha,
    })),
    areaServed: u.cidade,
    priceRange: "$$",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }} />;
}
