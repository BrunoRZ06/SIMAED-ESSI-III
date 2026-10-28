import type {
  MockExamGenerationInput,
} from "../types/ai-generation.js";

function getDifficultyInstruction(
  difficulty: MockExamGenerationInput["difficulty"]
) {
  if (difficulty === "easy") {
    return [
      "As questões devem apresentar enunciados claros e diretos.",
      "O aluno deve conseguir resolver as questões utilizando conceitos básicos da série.",
      "Evite excesso de etapas de raciocínio.",
      "Os distratores devem ser plausíveis, mas não excessivamente semelhantes à resposta correta.",
    ].join(" ");
  }

  if (difficulty === "medium") {
    return [
      "As questões devem exigir interpretação e aplicação dos conceitos estudados.",
      "Podem exigir mais de uma etapa de raciocínio.",
      "Os distratores devem ser plausíveis e exigir atenção do aluno.",
      "O nível deve permanecer adequado à série informada.",
    ].join(" ");
  }

  return [
    "As questões devem exigir análise, interpretação e aplicação mais aprofundada dos conceitos.",
    "Podem exigir múltiplas etapas de raciocínio.",
    "Os distratores devem ser plausíveis e próximos da resposta correta.",
    "A dificuldade deve ser elevada sem utilizar conteúdo acima da série informada.",
  ].join(" ");
}

function getQuestionTypeInstruction(
  questionType: MockExamGenerationInput["questionType"]
) {
  if (questionType === "previous") {
    return "Gere questões inéditas inspiradas no formato e no estilo de avaliações anteriores. Não afirme que são questões históricas reais e não reproduza questões protegidas por direitos autorais.";
  }

  if (questionType === "combined") {
    return "Gere uma combinação equilibrada de questões inéditas e questões inéditas inspiradas no formato de avaliações anteriores. Não afirme que qualquer questão é histórica real.";
  }

  return "Gere questões totalmente inéditas, sem apresentá-las como questões de provas anteriores.";
}

export function buildMockExamPrompt(
  input: MockExamGenerationInput
) {
  const descriptorsText =
    input.descriptors
      .map(
        (descriptor, index) =>
          `${index + 1}. descriptorId: ${descriptor.id}
Código: ${descriptor.code}
Descrição: ${descriptor.description}`
      )
      .join("\n\n");

  return `
Você é responsável por elaborar questões para um simulado educacional.

Gere exatamente ${input.questionCount} questões de múltipla escolha.

Disciplina:
${input.discipline.name}

Código da disciplina:
${input.discipline.code}

Série/Ano:
${input.stage.name}

Código da série:
${input.stage.code}

Nível de dificuldade:
${input.difficulty}

Tipo/origem solicitado:
${input.questionType}

Orientações para o tipo/origem:
${getQuestionTypeInstruction(input.questionType)}

Orientações para o nível de dificuldade:
${getDifficultyInstruction(input.difficulty)}

As questões devem avaliar somente as seguintes habilidades/descritores:

${descriptorsText}

Regras obrigatórias:

1. Cada questão deve possuir exatamente quatro alternativas: A, B, C e D.

2. Apenas uma alternativa deve estar correta.

3. Cada questão deve estar relacionada a exatamente um dos descritores fornecidos.

4. O descriptorId retornado deve ser exatamente um dos identificadores fornecidos acima.

5. Não invente novos descritores ou identificadores.

6. O conteúdo deve ser adequado à disciplina ${input.discipline.name}.

7. O conteúdo deve ser adequado à série ${input.stage.name}.

8. O nível pedagógico deve respeitar a dificuldade "${input.difficulty}".

9. Não utilize conhecimentos que estejam claramente acima do nível escolar informado.

10. Os enunciados devem ser claros, completos e suficientes para responder à questão.

11. As alternativas devem ser coerentes com o enunciado.

12. Não gere alternativas duplicadas.

13. O gabarito deve indicar somente A, B, C ou D.

14. O campo difficulty de todas as questões deve possuir exatamente o valor "${input.difficulty}".

15. Gere exatamente ${input.questionCount} questões.

Não inclua explicações, introduções ou comentários fora da estrutura de resposta solicitada.
`.trim();
}
