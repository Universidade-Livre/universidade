import { defineConfig } from "prisma/config";

// Node 22+ can load .env without the dotenv package, which keeps Docker runtime lean.
if (typeof process.loadEnvFile === "function") {
  process.loadEnvFile();
}

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
if (!POSTGRES_HOST || !POSTGRES_DB || !POSTGRES_USER || !POSTGRES_PASSWORD) {
  throw new Error("As variáveis de ambiente do PostgreSQL não foram definidas.");
}

export const datasourceUrl: string = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`;
export default defineConfig({
  schema: "../../prisma/schema.prisma",
  migrations: {
    path: "../../prisma/migrations",
  },
  datasource: {
    url: datasourceUrl,
  },
});
