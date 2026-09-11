import express from "express";
import cors from "cors";

import { prisma } from "./lib/prisma";
import disciplineRouter from "./routes/discipline.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/disciplines", disciplineRouter);

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    console.log("Banco de dados conectado.");

    app.listen(3000, "0.0.0.0", () => {
      console.log("API rodando na porta 3000");
    });
  } catch (error) {
    console.error(
      "Erro ao conectar ao banco de dados:",
      error
    );

    process.exit(1);
  }
}

startServer();