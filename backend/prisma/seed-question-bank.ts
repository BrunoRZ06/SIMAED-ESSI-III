import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { ArchiveReviewStatus, PrismaClient } from "../generated/prisma/client.js";
import { questionBankItems, questionBankSources } from "./question-bank.data.js";
import { originalPracticeItems } from "./original-question-bank.data.js";
import { additionalHistoricalItems } from "./historical-question-bank.data.js";
import { referenceQuestionItems } from "./reference-question-bank.data.js";
import { missingDescriptorPracticeItems } from "./missing-descriptor-practice.data.js";
import { secondGradePracticeItems } from "./second-grade-practice.data.js";

config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não definida. Verifique o arquivo backend/.env.");
}

let databaseUrl: URL;
try {
  databaseUrl = new URL(connectionString);
} catch {
  throw new Error("DATABASE_URL inválida. Use uma URL PostgreSQL no arquivo backend/.env.");
}

if (!databaseUrl.password) {
  throw new Error(
    "DATABASE_URL precisa incluir a senha do PostgreSQL. Confira backend/.env; não compartilhe esse valor."
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const sourceIds = new Map<string, string>();

  for (const source of questionBankSources) {
    const savedSource = await prisma.archivedQuestionSource.upsert({
      where: { code: source.code },
      update: {
        title: source.title,
        sourceType: source.sourceType,
        year: source.year,
        bookletCode: source.bookletCode,
        stageCode: source.stageCode,
        originalFileName: source.originalFileName,
        sourceNotes: source.sourceNotes,
      },
      create: source,
      select: { id: true },
    });

    sourceIds.set(source.code, savedSource.id);
  }

  const items = [
    ...questionBankItems,
    ...additionalHistoricalItems,
    ...referenceQuestionItems,
    ...originalPracticeItems,
    ...missingDescriptorPracticeItems,
    ...secondGradePracticeItems,
  ];
  const batchSize = 8;
  for (let index = 0; index < items.length; index += batchSize) {
    const batch = items.slice(index, index + batchSize);
    await Promise.all(batch.map(async (item) => {
      const sourceId = sourceIds.get(item.sourceCode);
      if (!sourceId) {
        throw new Error(`Fonte não cadastrada para o item ${item.itemCode}.`);
      }

      const alternatives = item.alternatives;
      const questionData = {
        itemCode: item.itemCode,
        disciplineCode: item.disciplineCode,
        descriptorCode: item.descriptorCode,
        statement: item.statement,
        stimulusText: item.stimulusText ?? null,
        stimulusAssetPath: item.stimulusAssetPath ?? null,
        stimulusAltText: item.stimulusAltText ?? null,
        pdfPageNumber: item.pdfPageNumber,
        correctAlternative: item.correctAlternative,
        answerSource: item.answerSource,
      };

      await prisma.archivedQuestion.upsert({
        where: {
          sourceId_number: {
            sourceId,
            number: item.number,
          },
        },
        update: {
          ...questionData,
          alternatives: {
            deleteMany: {},
            create: alternatives,
          },
        },
        create: {
          sourceId,
          number: item.number,
          ...questionData,
          reviewStatus: ArchiveReviewStatus.NEEDS_REVIEW,
          alternatives: { create: alternatives },
        },
      });
    }));
  }

  console.log(
    `Acervo atualizado: ${questionBankSources.length} fontes e ${items.length} questões (pendentes de revisão).`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Erro ao importar o acervo SAEPE:", error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
