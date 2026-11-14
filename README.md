# Clínica veterinária: site público e sistema interno

Um projeto só, com duas partes: o site público (com o cachorro 3D) e o sistema de gestão da clínica.
Next.js (App Router) + TypeScript + Tailwind + PostgreSQL (Prisma) + React Three Fiber + GSAP.

## Como rodar

São dois terminais.

```bash
npm install
npm run db          # terminal 1: sobe o PostgreSQL embutido (dados em .pgdata/)
npm run db:migrar   # terminal 2, só na primeira vez: cria as tabelas e os dados de exemplo
npm run dev         # terminal 2: http://localhost:3000
```

O banco de desenvolvimento é um PostgreSQL real que roda dentro do projeto, sem instalação no sistema.
Em produção, aponte `DATABASE_URL` (arquivo `.env`) para o seu servidor PostgreSQL e rode `npx prisma migrate deploy`.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` / `npm start` | Build e servidor de produção (o banco precisa estar no ar no build) |
| `npm run db:semear` | Cria os dados de exemplo, se o banco estiver vazio |
| `npm run db:zerar` | Apaga tudo e recria do zero |
| `npm run lint` | ESLint |

Equipe de exemplo: `admin@exemplo.vet`, `helena@exemplo.vet`, `recepcao@exemplo.vet` etc., senha `caramelo123`.
O login entra na etapa de autenticação; por enquanto esses usuários só existem no banco.

## Identidade: "Caramelo de plantão"

- **Cores** (em `src/app/globals.css`): osso `#F0E9DC`, focinho `#18130F`, caramelo `#C9782A` (só o cachorro e o rastro dele), língua `#FF4F8B`.
  Texto só em pares AA. Rosa nunca fica atrás do cachorro.
- **Fontes**: Anybody (exibição, variável em largura), Atkinson Hyperlegible Next (texto) e Mono (dados).
- **Componentes de estilo**: `.letreiro`, `.carimbo` (botão), `.traco` (link), `.selo` (estado), `.campo` (formulário).

### O cachorro

Fica em `src/components/cao/`. Não usa arquivo de modelo: o corpo é montado em código (`Cao.tsx`), com juntas e poses (`poses.ts`).

Qualquer seção pede uma pose com um atributo:

```tsx
import { cena } from "@/components/cao/estado";
<section {...cena({ pose: "farejando", x: 0.87, y: 0.93, escala: 0.8 })}>
```

Poses: `sentado`, `emPe`, `alerta`, `farejando`, `andando`, `olhandoCima`, `barrigaCima`, `deitado`, `dormindo`, `cavando`.
`data-abana` em um botão faz ele abanar o rabo no clique. Bancada de poses (só em desenvolvimento): `/dev/cao?pose=sentado`.

O 3D é carregado sob demanda: no computador depois que a página carrega; no celular só no primeiro toque.
Com "movimento reduzido" ou sem WebGL, fica o desenho estático.

## Estrutura

```
prisma/schema.prisma        88 tabelas, em 12 domínios
prisma/migrations/          inclui as regras em SQL: agenda sem choque, prontuário imutável, auditoria só-inserção
prisma/seed.ts              dados de exemplo
scripts/db.mjs              PostgreSQL embutido para desenvolvimento
src/app/(site)/             site público
src/components/cao/         cachorro 3D
src/components/home/        seções da página inicial e o scroll narrativo (Coreografia.tsx)
src/lib/agenda.ts           cálculo de horários livres
src/lib/dados.ts            leituras cacheadas do site
src/integracoes/            WhatsApp e e-mail, isolados
```

## Integrações externas

Cada uma fica em um arquivo de `src/integracoes/` e só é ativada por variáveis no `.env`.
Sem as variáveis, as mensagens ficam na fila (tabela `Mensagem`) com estado `AGUARDANDO_CONFIGURACAO`: nada aparece como enviado.

| Integração | Variáveis | Situação |
|---|---|---|
| WhatsApp (Cloud API da Meta) | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` | Escrita, não testada com credenciais reais. Falta o processo que esvazia a fila. |
| E-mail (Resend) | `RESEND_API_KEY`, `EMAIL_REMETENTE` | Idem. |
| Pagamento e nota fiscal | a definir | Tabelas prontas; integração entra com o módulo financeiro. |

`NEXT_PUBLIC_SITE_URL` deve ter o endereço público do site (usado em sitemap, robots e dados estruturados).

## Andamento

Feito:

- Identidade visual e cachorro 3D
- Site público: início, serviços, equipe, estrutura, depoimentos, blog, contato com mapa, plantão, privacidade
- Agendamento online com horários em tempo real
- SEO: metadados, sitemap, robots, dados estruturados (clínica, serviço, artigo)
- Modelo de dados completo no banco

Falta, na ordem combinada:

1. Autenticação (equipe com 2 fatores, tutores) e cadastros
2. Portal do tutor
3. Agenda interna
4. Prontuário
5. Demais módulos

## Antes de publicar

- Trocar os dados de exemplo (nome, endereço, telefones, equipe, CRMV, depoimentos) e apagar a configuração `dadosDeExemplo`
- Revisar o texto de `/privacidade` com quem responde pela LGPD
- Fotos reais da equipe e da estrutura
- Os ladrilhos do mapa vêm do servidor público do OpenStreetMap; para tráfego alto, contratar um provedor de mapas
