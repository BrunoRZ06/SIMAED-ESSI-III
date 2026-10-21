import {
  parseGeneratedMockExam,
} from "../ai/parsers/generated-question.parser.js";

import {
  validateGeneratedMockExamStructure,
} from "../services/generated-mock-exam-validation.service.js";

const response =
  JSON.stringify({
    questions: [
      {
        statement:
          "Qual é o resultado de 12 + 8?",

        alternatives: [
          {
            id: "A",
            text: "18",
          },
          {
            id: "B",
            text: "20",
          },
          {
            id: "C",
            text: "21",
          },
          {
            id: "D",
            text: "22",
          },
        ],

        correctAnswer:
          "B",

        descriptorId:
          "569e5a88-9b9b-4a5c-a7cf-849d75f158b9",

        difficulty:
          "easy",
      },
    ],
  });

const exam =
  parseGeneratedMockExam(
    response
  );

validateGeneratedMockExamStructure(
  exam
);

console.log(
  JSON.stringify(
    exam,
    null,
    2
  )
);

console.log(
  "Resposta válida."
);