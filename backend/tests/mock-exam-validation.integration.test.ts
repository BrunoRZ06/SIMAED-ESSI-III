import { randomUUID } from "node:crypto";

import request from "supertest";

import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";

import { app } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

const runId = randomUUID()
  .replaceAll("-", "")
  .slice(0, 8);

const matrixCode =
  `TEST_US05_MATRIX_${runId}`;

const mathematicsCode =
  `TEST_US05_MAT_${runId}`;

const portugueseCode =
  `TEST_US05_PORT_${runId}`;

const inactiveDisciplineCode =
  `TEST_US05_INACTIVE_${runId}`;

const stage5Code =
  `TEST_US05_5EF_${runId}`;

const stage9Code =
  `TEST_US05_9EF_${runId}`;

let matrixId = "";

let math5DescriptorId = "";
let math9DescriptorId = "";
let portuguese5DescriptorId = "";

beforeAll(async () => {
  const matrix =
    await prisma.referenceMatrix.create({
      data: {
        code: matrixCode,
        name: `Matriz teste US05 ${runId}`,
        year: 2025,
        evaluationType: "TEST",
        isActive: true,
      },
    });

  matrixId = matrix.id;

  const mathematics =
    await prisma.discipline.create({
      data: {
        code: mathematicsCode,
        name: `Matemática teste ${runId}`,
        isActive: true,
      },
    });

  const portuguese =
    await prisma.discipline.create({
      data: {
        code: portugueseCode,
        name: `Português teste ${runId}`,
        isActive: true,
      },
    });

  await prisma.discipline.create({
    data: {
      code: inactiveDisciplineCode,
      name: `Disciplina inativa ${runId}`,
      isActive: false,
    },
  });

  const stage5 =
    await prisma.stage.create({
      data: {
        code: stage5Code,
        name: `5EF teste ${runId}`,
        isActive: true,
      },
    });

  const stage9 =
    await prisma.stage.create({
      data: {
        code: stage9Code,
        name: `9EF teste ${runId}`,
        isActive: true,
      },
    });

  const math5Descriptor =
    await prisma.descriptor.create({
      data: {
        code: "D01",
        description:
          "Descritor Matemática 5EF Teste",
        matrixId: matrix.id,
        stageId: stage5.id,
        disciplineId: mathematics.id,
        isActive: true,
      },
    });

  const math9Descriptor =
    await prisma.descriptor.create({
      data: {
        code: "D02",
        description:
          "Descritor Matemática 9EF Teste",
        matrixId: matrix.id,
        stageId: stage9.id,
        disciplineId: mathematics.id,
        isActive: true,
      },
    });

  const portuguese5Descriptor =
    await prisma.descriptor.create({
      data: {
        code: "D03",
        description:
          "Descritor Português 5EF Teste",
        matrixId: matrix.id,
        stageId: stage5.id,
        disciplineId: portuguese.id,
        isActive: true,
      },
    });

  math5DescriptorId =
    math5Descriptor.id;

  math9DescriptorId =
    math9Descriptor.id;

  portuguese5DescriptorId =
    portuguese5Descriptor.id;
});

afterAll(async () => {
  if (matrixId) {
    await prisma.descriptor.deleteMany({
      where: {
        matrixId,
      },
    });

    await prisma.referenceMatrix.deleteMany({
      where: {
        id: matrixId,
      },
    });
  }

  await prisma.discipline.deleteMany({
    where: {
      code: {
        in: [
          mathematicsCode,
          portugueseCode,
          inactiveDisciplineCode,
        ],
      },
    },
  });

  await prisma.stage.deleteMany({
    where: {
      code: {
        in: [
          stage5Code,
          stage9Code,
        ],
      },
    },
  });
});

function validPayload() {
  return {
    disciplineCode: mathematicsCode,
    stageCode: stage5Code,
    descriptorIds: [
      math5DescriptorId,
    ],
    questionCount: 10,
    difficulty: "easy",
    questionType: "new",
  };
}

describe(
  "US-05 - Validação dos parâmetros do simulado",
  () => {
    it(
      "US05-CT01 - aceita configuração completa válida",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send(validPayload());

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.valid
        ).toBe(true);
      }
    );

    it(
      "US05-CT02 - rejeita ausência de disciplina",
      async () => {
        const payload =
          validPayload();

        const {
          disciplineCode,
          ...body
        } = payload;

        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send(body);

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "disciplineCode"
          )
        ).toBe(true);
      }
    );

    it(
      "US05-CT03 - rejeita ausência de série",
      async () => {
        const payload =
          validPayload();

        const {
          stageCode,
          ...body
        } = payload;

        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send(body);

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "stageCode"
          )
        ).toBe(true);
      }
    );

    it(
      "US05-CT04 - rejeita configuração sem habilidades",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              descriptorIds: [],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "descriptorIds"
          )
        ).toBe(true);
      }
    );

    it(
      "US05-CT05 - rejeita parâmetro obrigatório com valor nulo",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              disciplineCode: null,
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "disciplineCode"
          )
        ).toBe(true);
      }
    );

    it(
      "US05-CT06 - rejeita disciplina inexistente",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              disciplineCode:
                `DOES_NOT_EXIST_${runId}`,
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: "NOT_FOUND",
              field:
                "disciplineCode",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT07 - rejeita disciplina inativa",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              disciplineCode:
                inactiveDisciplineCode,
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: "INACTIVE",
              field:
                "disciplineCode",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT08 - rejeita série incompatível com disciplina",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              disciplineCode:
                portugueseCode,
              stageCode:
                stage9Code,
              descriptorIds: [
                portuguese5DescriptorId,
              ],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code:
                "INCOMPATIBLE",
              field:
                "stageCode",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT09 - rejeita habilidade inexistente",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              descriptorIds: [
                "11111111-1111-4111-8111-111111111111",
              ],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: "NOT_FOUND",
              field:
                "descriptorIds",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT10 - rejeita habilidade de outra disciplina",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              descriptorIds: [
                portuguese5DescriptorId,
              ],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code:
                "INCOMPATIBLE",
              field:
                "descriptorIds",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT11 - rejeita habilidade incompatível com a série",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              descriptorIds: [
                math9DescriptorId,
              ],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code:
                "INCOMPATIBLE",
              field:
                "descriptorIds",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT12 - rejeita conjunto quando uma habilidade é incompatível",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              descriptorIds: [
                math5DescriptorId,
                math9DescriptorId,
              ],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors
        ).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code:
                "INCOMPATIBLE",
              field:
                "descriptorIds",
            }),
          ])
        );
      }
    );

    it(
      "US05-CT13 - rejeita habilidades duplicadas",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              descriptorIds: [
                math5DescriptorId,
                math5DescriptorId,
              ],
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);
      }
    );

    it.each([
      10,
      15,
      20,
    ])(
      "US05-CT14 - aceita quantidade válida %i",
      async (
        questionCount
      ) => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              questionCount,
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.valid
        ).toBe(true);
      }
    );

    it(
      "US05-CT15 - rejeita quantidade de questões inválida",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              questionCount: 12,
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "questionCount"
          )
        ).toBe(true);
      }
    );

    it.each([
      "easy",
      "medium",
      "hard",
    ])(
      "US05-CT16 - aceita dificuldade válida %s",
      async (
        difficulty
      ) => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              difficulty,
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.valid
        ).toBe(true);
      }
    );

    it(
      "US05-CT17 - rejeita dificuldade inválida",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              difficulty:
                "extreme",
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "difficulty"
          )
        ).toBe(true);
      }
    );

    it.each([
      "previous",
      "new",
      "combined",
    ])(
      "US05-CT18 - aceita tipo de questão válido %s",
      async (
        questionType
      ) => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              questionType,
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.valid
        ).toBe(true);
      }
    );

    it(
      "US05-CT19 - rejeita tipo de questão inválido",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              questionType:
                "random",
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.errors.some(
            (error: {
              field: string;
            }) =>
              error.field ===
              "questionType"
          )
        ).toBe(true);
      }
    );

    it(
      "US05-CT20 - identifica múltiplos parâmetros inválidos",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/validate"
            )
            .send({
              ...validPayload(),
              questionCount: 12,
              difficulty:
                "extreme",
              questionType:
                "random",
            });

        expect(
          response.status
        ).toBe(400);

        const fields =
          response.body.errors.map(
            (error: {
              field: string;
            }) =>
              error.field
          );

        expect(
          fields
        ).toContain(
          "questionCount"
        );

        expect(
          fields
        ).toContain(
          "difficulty"
        );

        expect(
          fields
        ).toContain(
          "questionType"
        );
      }
    );

    it(
      "US05-CT21 - bloqueia geração após falha de validação",
      async () => {
        const response =
          await request(app)
            .post(
              "/mock-exams/generate"
            )
            .send({
              ...validPayload(),
              questionCount: 12,
            });

        expect(
          response.status
        ).toBe(400);

        expect(
          response.body.valid
        ).toBe(false);

        expect(
          response.body.accepted
        ).not.toBe(true);
      }
    );
  }
);