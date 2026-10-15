import { randomUUID } from "node:crypto";

import request from "supertest";

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const dispatchSpy = vi.hoisted(() =>
  vi.fn()
);

vi.mock(
  "../src/services/mock-exam-generator.service.js",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("../src/services/mock-exam-generator.service.js")
      >();

    dispatchSpy.mockImplementation(
      original.dispatchMockExamGeneration
    );

    return {
      ...original,
      dispatchMockExamGeneration:
        dispatchSpy,
    };
  }
);

import { app } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

const runId = randomUUID()
  .replaceAll("-", "")
  .slice(0, 8);

const matrixCode =
  `TEST_US06_MATRIX_${runId}`;

const mathematicsCode =
  `TEST_US06_MAT_${runId}`;

const stage5Code =
  `TEST_US06_5EF_${runId}`;

let matrixId = "";

let descriptorIds: string[] = [];

beforeAll(async () => {
  const matrix =
    await prisma.referenceMatrix.create({
      data: {
        code: matrixCode,
        name: `Matriz teste US06 ${runId}`,
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
        name: `Matemática US06 ${runId}`,
        isActive: true,
      },
    });

  const stage5 =
    await prisma.stage.create({
      data: {
        code: stage5Code,
        name: `5EF US06 ${runId}`,
        isActive: true,
      },
    });

  const descriptors =
    await Promise.all(
      ["D01", "D02", "D03"].map(
        (code) =>
          prisma.descriptor.create({
            data: {
              code,
              description:
                `Descritor ${code} US06`,
              matrixId: matrix.id,
              stageId: stage5.id,
              disciplineId:
                mathematics.id,
              isActive: true,
            },
          })
      )
    );

  descriptorIds =
    descriptors.map(
      (descriptor) => descriptor.id
    );
});

afterAll(async () => {
  await prisma.mockExamGenerationRequest.deleteMany({
    where: {
      disciplineCode:
        mathematicsCode,
    },
  });

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
      code: mathematicsCode,
    },
  });

  await prisma.stage.deleteMany({
    where: {
      code: stage5Code,
    },
  });
});

beforeEach(async () => {
  dispatchSpy.mockClear();

  await prisma.mockExamGenerationRequest.deleteMany({
    where: {
      disciplineCode:
        mathematicsCode,
    },
  });
});

function validPayload(
  overrides: Record<string, unknown> = {}
) {
  return {
    disciplineCode: mathematicsCode,
    stageCode: stage5Code,
    descriptorIds: [
      descriptorIds[0],
    ],
    questionCount: 10,
    difficulty: "easy",
    questionType: "new",
    ...overrides,
  };
}

function countRequests() {
  return prisma.mockExamGenerationRequest.count({
    where: {
      disciplineCode:
        mathematicsCode,
    },
  });
}

function findStoredRequest(
  requestId: string
) {
  return prisma.mockExamGenerationRequest.findUnique({
    where: {
      requestId,
    },
  });
}

describe(
  "US-06 - Solicitação de geração do simulado",
  () => {
    it(
      "US06-CT01 - aceita configuração válida (reteste SCRUM-152)",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        expect(response.status).toBe(202);
        expect(response.body.accepted).toBe(true);
      }
    );

    it(
      "US06-CT02 - envia disciplina e série corretamente",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        const stored =
          await findStoredRequest(
            response.body.requestId
          );

        expect(stored?.disciplineCode).toBe(
          mathematicsCode
        );
        expect(stored?.stageCode).toBe(
          stage5Code
        );
      }
    );

    it(
      "US06-CT03 - envia quantidade, dificuldade e tipo corretamente",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(
              validPayload({
                questionCount: 20,
                difficulty: "hard",
                questionType: "combined",
              })
            );

        const stored =
          await findStoredRequest(
            response.body.requestId
          );

        expect(stored?.questionCount).toBe(20);
        expect(stored?.difficulty).toBe("hard");
        expect(stored?.questionType).toBe(
          "combined"
        );
      }
    );

    it(
      "US06-CT04 - envia múltiplas habilidades",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(
              validPayload({
                descriptorIds,
              })
            );

        const stored =
          await findStoredRequest(
            response.body.requestId
          );

        expect(
          [...(stored?.descriptorIds ?? [])].sort()
        ).toEqual([...descriptorIds].sort());
      }
    );

    it(
      "US06-CT05 - rejeita configuração inválida antes da geração",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(
              validPayload({
                questionCount: 12,
              })
            );

        expect(response.status).toBe(400);
        expect(response.body.valid).toBe(false);
        expect(response.body.accepted).not.toBe(
          true
        );
      }
    );

    it(
      "US06-CT06 - configuração inválida não aciona a geração",
      async () => {
        await request(app)
          .post("/mock-exams/generate")
          .send(
            validPayload({
              descriptorIds: [randomUUID()],
            })
          );

        expect(await countRequests()).toBe(0);
        expect(dispatchSpy).not.toHaveBeenCalled();
      }
    );

    it(
      "US06-CT07 - cria solicitação com configuração válida",
      async () => {
        await request(app)
          .post("/mock-exams/generate")
          .send(validPayload());

        expect(await countRequests()).toBe(1);
      }
    );

    it(
      "US06-CT08 - solicitação possui identificador único (UUID)",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        expect(response.body.requestId).toMatch(
          /^[0-9a-f-]{36}$/
        );
      }
    );

    it(
      "US06-CT09 - solicitações distintas recebem identificadores distintos",
      async () => {
        const first =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        const second =
          await request(app)
            .post("/mock-exams/generate")
            .send(
              validPayload({
                difficulty: "medium",
              })
            );

        expect(first.body.requestId).not.toBe(
          second.body.requestId
        );
      }
    );

    it(
      "US06-CT10 - estado inicial compatível com processamento",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        expect(["PENDING", "PROCESSING"]).toContain(
          response.body.status
        );
      }
    );

    it(
      "US06-CT11 - encaminha parâmetros validados ao serviço de geração",
      async () => {
        const payload =
          validPayload({ descriptorIds });

        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(payload);

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith({
          requestId: response.body.requestId,
          config: payload,
        });
      }
    );

    it(
      "US06-CT12 - resposta contém identificador e estado (reteste SCRUM-152)",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        expect(response.status).toBe(202);
        expect(response.body).toEqual(
          expect.objectContaining({
            accepted: true,
            requestId: expect.any(String),
            status: expect.any(String),
          })
        );
      }
    );

    it(
      "US06-CT13 - falha na criação retorna erro controlado (reteste SCRUM-153)",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .set(
              "x-simulate-generation-failure",
              "true"
            )
            .send(validPayload());

        expect(response.status).toBeGreaterThanOrEqual(
          500
        );
        expect(response.body).toEqual({
          accepted: false,
          code:
            "GENERATION_REQUEST_CREATION_FAILED",
          message: expect.any(String),
        });
        expect(response.body.requestId).toBeUndefined();
        expect(await countRequests()).toBe(0);
      }
    );

    it(
      "US06-CT14 - nova tentativa após falha funciona normalmente",
      async () => {
        await request(app)
          .post("/mock-exams/generate")
          .set(
            "x-simulate-generation-failure",
            "true"
          )
          .send(validPayload());

        const retry =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        expect(retry.status).toBe(202);
        expect(retry.body.accepted).toBe(true);
        expect(await countRequests()).toBe(1);
      }
    );

    it(
      "US06-CT15 - cliques rápidos não criam solicitações duplicadas",
      async () => {
        const responses =
          await Promise.all(
            Array.from({ length: 3 }, () =>
              request(app)
                .post("/mock-exams/generate")
                .send(validPayload())
            )
          );

        const requestIds = new Set(
          responses.map(
            (response) =>
              response.body.requestId
          )
        );

        expect(requestIds.size).toBe(1);
        expect(await countRequests()).toBe(1);
      }
    );

    it(
      "US06-CT16 - parâmetros originais permanecem associados",
      async () => {
        const payload =
          validPayload({
            questionCount: 15,
            difficulty: "medium",
            questionType: "previous",
          });

        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(payload);

        const stored =
          await findStoredRequest(
            response.body.requestId
          );

        expect(stored).toEqual(
          expect.objectContaining(payload)
        );
        expect(stored?.configHash).toMatch(
          /^[0-9a-f]{64}$/
        );
      }
    );

    it(
      "US06-CT17 - múltiplas habilidades permanecem associadas",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(
              validPayload({
                descriptorIds,
              })
            );

        const stored =
          await findStoredRequest(
            response.body.requestId
          );

        expect(stored?.descriptorIds).toHaveLength(
          descriptorIds.length
        );
      }
    );

    it(
      "US06-CT18 - solicitação recém-criada não aparece como concluída",
      async () => {
        const response =
          await request(app)
            .post("/mock-exams/generate")
            .send(validPayload());

        const stored =
          await findStoredRequest(
            response.body.requestId
          );

        expect(response.body.status).not.toBe(
          "COMPLETED"
        );
        expect(stored?.status).not.toBe(
          "COMPLETED"
        );
      }
    );
  }
);
