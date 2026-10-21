import { z } from "zod";

export const generatedAlternativeSchema =
  z.object({
    id: z.enum([
      "A",
      "B",
      "C",
      "D",
    ]),

    text: z
      .string()
      .min(1),
  });

export const generatedQuestionSchema =
  z.object({
    statement: z
      .string()
      .min(1),

    alternatives: z
      .array(
        generatedAlternativeSchema
      )
      .length(4),

    correctAnswer: z.enum([
      "A",
      "B",
      "C",
      "D",
    ]),

    descriptorId: z
      .string()
      .uuid(),

    difficulty: z.enum([
      "easy",
      "medium",
      "hard",
    ]),
  });

export const generatedMockExamSchema =
  z.object({
    questions: z.array(
      generatedQuestionSchema
    ),
  });

export const generatedMockExamJsonSchema = {
  type: "object",

  properties: {
    questions: {
      type: "array",

      items: {
        type: "object",

        properties: {
          statement: {
            type: "string",
          },

          alternatives: {
            type: "array",
            minItems: 4,
            maxItems: 4,

            items: {
              type: "object",

              properties: {
                id: {
                  type: "string",
                  enum: [
                    "A",
                    "B",
                    "C",
                    "D",
                  ],
                },

                text: {
                  type: "string",
                },
              },

              required: [
                "id",
                "text",
              ],

              additionalProperties:
                false,
            },
          },

          correctAnswer: {
            type: "string",

            enum: [
              "A",
              "B",
              "C",
              "D",
            ],
          },

          descriptorId: {
            type: "string",
            format: "uuid",
          },

          difficulty: {
            type: "string",

            enum: [
              "easy",
              "medium",
              "hard",
            ],
          },
        },

        required: [
          "statement",
          "alternatives",
          "correctAnswer",
          "descriptorId",
          "difficulty",
        ],

        additionalProperties:
          false,
      },
    },
  },

  required: [
    "questions",
  ],

  additionalProperties:
    false,
};

export type GeneratedAlternative =
  z.infer<
    typeof generatedAlternativeSchema
  >;

export type GeneratedQuestion =
  z.infer<
    typeof generatedQuestionSchema
  >;

export type GeneratedMockExam =
  z.infer<
    typeof generatedMockExamSchema
  >;