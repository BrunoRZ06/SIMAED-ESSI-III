import { prisma } from "../lib/prisma.js";
import type { QuestionBankQuery } from "../schemas/question-bank.schema.js";

export async function findQuestionBankPage(query: QuestionBankQuery) {
  const where = {
    ...(query.disciplineCode ? { disciplineCode: query.disciplineCode } : {}),
    ...(query.descriptorCode ? { descriptorCode: query.descriptorCode } : {}),
    ...(query.reviewStatus ? { reviewStatus: query.reviewStatus } : {}),
    source: {
      is: {
        ...(query.year ? { year: query.year } : {}),
        ...(query.stageCode ? { stageCode: query.stageCode } : {}),
        ...(query.sourceType ? { sourceType: query.sourceType } : {}),
      },
    },
  };

  const [total, questions] = await Promise.all([
    prisma.archivedQuestion.count({ where }),
    prisma.archivedQuestion.findMany({
      where,
      orderBy: [
        { source: { year: "asc" } },
        { number: "asc" },
      ],
      skip: query.offset,
      take: query.limit,
      include: {
        source: {
          select: {
            code: true,
            title: true,
            sourceType: true,
            year: true,
            bookletCode: true,
            stageCode: true,
            originalFileName: true,
          },
        },
        alternatives: {
          orderBy: { label: "asc" },
          select: { label: true, text: true },
        },
      },
    }),
  ]);

  return {
    total,
    limit: query.limit,
    offset: query.offset,
    items: questions.map((question) => ({
      id: question.id,
      number: question.number,
      itemCode: question.itemCode,
      disciplineCode: question.disciplineCode,
      descriptorCode: question.descriptorCode,
      statement: question.statement,
      stimulus: question.stimulusAssetPath
        ? {
            imageUrl: `/question-assets/${question.stimulusAssetPath}`,
            altText: question.stimulusAltText,
          }
        : question.stimulusText
          ? { text: question.stimulusText }
          : null,
      pdfPageNumber: question.pdfPageNumber,
      correctAlternative: question.correctAlternative,
      answerSource: question.answerSource,
      reviewStatus: question.reviewStatus,
      alternatives: question.alternatives,
      source: question.source,
    })),
  };
}
