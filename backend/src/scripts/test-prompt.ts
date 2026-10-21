import {
  buildMockExamPrompt,
} from "../ai/prompts/mock-exam.prompt.js";

const prompt =
  buildMockExamPrompt({
    requestId:
      "967e1e34-4e2e-4af4-976c-430c9ee49dcc",

    discipline: {
      code: "MATHEMATICS",
      name: "Matemática",
    },

    stage: {
      code: "5EF",
      name: "5º ano do Ensino Fundamental",
    },

    questionCount: 10,

    difficulty: "easy",

    descriptors: [
      {
        id:
          "569e5a88-9b9b-4a5c-a7cf-849d75f158b9",

        code: "D01",

        description:
          "Resolver problemas utilizando conhecimentos matemáticos adequados à série.",
      },
    ],
  });

console.log(prompt);