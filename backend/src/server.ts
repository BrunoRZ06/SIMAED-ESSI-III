import { app } from "./app.js";
import { prisma } from "./lib/prisma.js";

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    console.log(
      "Banco de dados conectado."
    );

    app.listen(
      3000,
      "0.0.0.0",
      () => {
        console.log(
          "API rodando na porta 3000"
        );
      }
    );
  } catch (error) {
    console.error(
      "Erro ao iniciar servidor:",
      error
    );

    process.exit(1);
  }
}

startServer();