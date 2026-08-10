import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Runtime app uses DATABASE_URL (pooler). For db:push, package.json sets DATABASE_URL=$DIRECT_URL.
    url: process.env["DATABASE_URL"],
  },
});
