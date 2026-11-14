import type { ReactNode } from "react";

// Formatação mínima para textos do blog e dos serviços: parágrafos, "## título",
// listas com "- " e **negrito**. Sem HTML: o que vem do banco é sempre tratado como texto.
function negrito(linha: string): ReactNode[] {
  return linha.split(/(\*\*[^*]+\*\*)/g).map((trecho, i) =>
    trecho.startsWith("**") && trecho.endsWith("**") ? <strong key={i}>{trecho.slice(2, -2)}</strong> : trecho,
  );
}

export function Texto({ fonte }: { fonte: string }) {
  const blocos = fonte.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <div className="prosa">
      {blocos.map((bloco, i) => {
        const linhas = bloco.split("\n").filter(Boolean);
        if (!linhas.length) return null;
        if (linhas[0].startsWith("## ")) return <h2 key={i}>{linhas[0].slice(3)}</h2>;
        if (linhas.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i}>
              {linhas.map((l, k) => (
                <li key={k}>{negrito(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{negrito(linhas.join(" "))}</p>;
      })}
    </div>
  );
}
