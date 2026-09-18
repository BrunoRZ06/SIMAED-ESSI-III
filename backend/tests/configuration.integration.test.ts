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

async function clearDatabase() {
  await prisma.descriptor.deleteMany();
  await prisma.referenceMatrix.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.discipline.deleteMany();
}

beforeAll(async () => {
  await clearDatabase();

  const activeMatrix =
    await prisma.referenceMatrix.create({
      data: {
        code: "SAEPE_TEST_ACTIVE",
        name: "SAEPE Teste - Matriz Ativa",
        year: 2025,
        evaluationType: "SOMATIVA",
        isActive: true,
      },
    });

  const inactiveMatrix =
    await prisma.referenceMatrix.create({
      data: {
        code: "SAEPE_TEST_INACTIVE",
        name: "SAEPE Teste - Matriz Inativa",
        year: 2024,
        evaluationType: "SOMATIVA",
        isActive: false,
      },
    });

  const mathematics =
    await prisma.discipline.create({
      data: {
        code: "MATHEMATICS",
        name: "Matemática",
        isActive: true,
      },
    });

  const portuguese =
    await prisma.discipline.create({
      data: {
        code: "PORTUGUESE",
        name: "Língua Portuguesa",
        isActive: true,
      },
    });

  const science =
    await prisma.discipline.create({
      data: {
        code: "SCIENCE",
        name: "Ciências",
        isActive: false,
      },
    });

  const fifthGrade =
    await prisma.stage.create({
      data: {
        code: "5EF",
        name: "5º ano do Ensino Fundamental",
        isActive: true,
      },
    });

  const ninthGrade =
    await prisma.stage.create({
      data: {
        code: "9EF",
        name: "9º ano do Ensino Fundamental",
        isActive: true,
      },
    });

  const inactiveStage =
    await prisma.stage.create({
      data: {
        code: "3EM",
        name: "3ª série do Ensino Médio",
        isActive: false,
      },
    });

  await prisma.descriptor.createMany({
    data: [
      {
        code: "D01",
        description: "Matemática 5EF D01",
        matrixId: activeMatrix.id,
        disciplineId: mathematics.id,
        stageId: fifthGrade.id,
        isActive: true,
      },

      {
        code: "D02",
        description: "Matemática 5EF D02",
        matrixId: activeMatrix.id,
        disciplineId: mathematics.id,
        stageId: fifthGrade.id,
        isActive: true,
      },

      {
        code: "D01",
        description: "Português 9EF D01",
        matrixId: activeMatrix.id,
        disciplineId: portuguese.id,
        stageId: ninthGrade.id,
        isActive: true,
      },

      {
        code: "D03",
        description: "Descritor em série inativa",
        matrixId: activeMatrix.id,
        disciplineId: mathematics.id,
        stageId: inactiveStage.id,
        isActive: true,
      },

      {
        code: "D99",
        description: "Descritor inativo",
        matrixId: activeMatrix.id,
        disciplineId: mathematics.id,
        stageId: fifthGrade.id,
        isActive: false,
      },

      {
        code: "D88",
        description: "Descritor de matriz inativa",
        matrixId: inactiveMatrix.id,
        disciplineId: mathematics.id,
        stageId: fifthGrade.id,
        isActive: true,
      },

      {
        code: "D01",
        description: "Descritor de disciplina inativa",
        matrixId: activeMatrix.id,
        disciplineId: science.id,
        stageId: fifthGrade.id,
        isActive: true,
      },
    ],
  });
});

afterAll(async () => {
  await clearDatabase();
  await prisma.$disconnect();
});

describe("Configuração SAEPE", () => {
  it("retorna apenas disciplinas ativas", async () => {
    const response =
      await request(app).get("/disciplines");

    expect(response.status).toBe(200);

    const codes = response.body.map(
      (discipline: { code: string }) =>
        discipline.code
    );

    expect(codes).toContain("MATHEMATICS");
    expect(codes).toContain("PORTUGUESE");
    expect(codes).not.toContain("SCIENCE");
  });

  it("retorna somente séries compatíveis com Matemática", async () => {
    const response = await request(app).get(
      "/disciplines/MATHEMATICS/stages"
    );

    expect(response.status).toBe(200);

    const codes = response.body.map(
      (stage: { code: string }) =>
        stage.code
    );

    expect(codes).toContain("5EF");
    expect(codes).not.toContain("9EF");
    expect(codes).not.toContain("3EM");
  });

  it("não retorna séries para disciplina inativa", async () => {
    const response = await request(app).get(
      "/disciplines/SCIENCE/stages"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("retorna somente descritores compatíveis com Matemática + 5EF", async () => {
    const response = await request(app).get(
      "/disciplines/MATHEMATICS/stages/5EF/descriptors"
    );

    expect(response.status).toBe(200);

    const codes = response.body.map(
      (descriptor: { code: string }) =>
        descriptor.code
    );

    expect(codes).toEqual([
      "D01",
      "D02",
    ]);
  });

  it("não retorna descritores de outra disciplina", async () => {
    const response = await request(app).get(
      "/disciplines/MATHEMATICS/stages/9EF/descriptors"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("não retorna descritores de série inativa", async () => {
    const response = await request(app).get(
      "/disciplines/MATHEMATICS/stages/3EM/descriptors"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("não retorna descritor inativo", async () => {
    const response = await request(app).get(
      "/disciplines/MATHEMATICS/stages/5EF/descriptors"
    );

    const codes = response.body.map(
      (descriptor: { code: string }) =>
        descriptor.code
    );

    expect(codes).not.toContain("D99");
  });

  it("não retorna descritor de matriz inativa", async () => {
    const response = await request(app).get(
      "/disciplines/MATHEMATICS/stages/5EF/descriptors"
    );

    const codes = response.body.map(
      (descriptor: { code: string }) =>
        descriptor.code
    );

    expect(codes).not.toContain("D88");
  });
});