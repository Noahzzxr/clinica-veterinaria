import type { MetadataRoute } from "next";
import { listarEquipe, listarPosts, listarServicos } from "@/lib/dados";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [servicos, equipe, posts] = await Promise.all([listarServicos(), listarEquipe(), listarPosts()]);
  const fixas = ["", "/servicos", "/equipe", "/estrutura", "/depoimentos", "/blog", "/contato", "/plantao", "/agendar", "/privacidade"];
  return [
    ...fixas.map((c) => ({ url: base + c, changeFrequency: "weekly" as const, priority: c === "" ? 1 : 0.7 })),
    ...servicos.map((s) => ({ url: `${base}/servicos/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...equipe.flatMap((p) => (p.slug ? [{ url: `${base}/equipe/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }] : [])),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.publicadoEm ?? undefined, priority: 0.6 })),
  ];
}
