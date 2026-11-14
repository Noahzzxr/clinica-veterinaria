// Sobe um PostgreSQL real, embutido no projeto, para desenvolvimento.
// Os dados ficam em .pgdata/. Em produção, aponte DATABASE_URL para o seu servidor.
import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(raiz, ".pgdata");
const porta = Number(process.env.PGPORT ?? 54329);

const pg = new EmbeddedPostgres({
  databaseDir: dir,
  user: "vet",
  password: "vet",
  port: porta,
  persistent: true,
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
  onLog: () => {},
  onError: (e) => console.error(String(e)),
});

if (!existsSync(path.join(dir, "PG_VERSION"))) {
  console.log("Criando o banco em .pgdata (só na primeira vez)...");
  await pg.initialise();
}
await pg.start();

const cliente = pg.getPgClient();
await cliente.connect();
const { rowCount } = await cliente.query("SELECT 1 FROM pg_database WHERE datname = 'vet'");
if (!rowCount) await cliente.query("CREATE DATABASE vet");
await cliente.end();

console.log(`PostgreSQL no ar: postgresql://vet:vet@localhost:${porta}/vet`);

let parando = false;
async function parar() {
  if (parando) return;
  parando = true;
  await pg.stop();
  process.exit(0);
}
process.on("SIGINT", parar);
process.on("SIGTERM", parar);
setInterval(() => {}, 1 << 30);
