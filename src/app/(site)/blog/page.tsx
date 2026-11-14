import type { Metadata } from "next";
import { CartaoPost } from "@/components/home/secoes";
import Ficha from "@/components/site/Ficha";
import Topo from "@/components/site/Topo";
import { listarPosts } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Blog",
  description: "Orientações dos veterinários da casa sobre vacinas, emergências e comportamento.",
  alternates: { canonical: "/blog" },
};

export default async function Blog() {
  const posts = await listarPosts();
  return (
    <Ficha>
      <main>
        <Topo rotulo={`Blog · ${posts.length} textos`} titulo="Para ler no sofá" pose="deitado">
          <p>Orientação escrita pelos veterinários da casa, sem alarmismo.</p>
        </Topo>
        <ul className="dentro grid gap-6 pb-28 md:grid-cols-2 lg:mr-[16%] lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <CartaoPost p={p} />
            </li>
          ))}
        </ul>
      </main>
    </Ficha>
  );
}
