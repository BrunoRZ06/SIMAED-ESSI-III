import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString =
  process.env.DATABASE_URL!;

const databaseSchema =
  process.env.DATABASE_SCHEMA ??
  "public";

const adapter = new PrismaPg(
  {
    connectionString,
  },
  {
    schema: databaseSchema,
  }
);

export const prisma =
  new PrismaClient({
    adapter,
  });