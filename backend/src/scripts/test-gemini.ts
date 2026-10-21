import "dotenv/config";

import {
  GoogleGenAI,
} from "@google/genai";

async function main() {
  const apiKey =
    process.env.GEMINI_API_KEY;

  const model =
    process.env.GEMINI_MODEL ??
    "gemini-3.8-flash";

  console.log(
    "Chave configurada:",
    Boolean(apiKey)
  );

  console.log(
    "Modelo:",
    model
  );

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY não encontrada no .env."
    );
  }

  const ai =
    new GoogleGenAI({
      apiKey,
    });

  const response =
    await ai.models.generateContent({
      model,
      contents:
        "Responda apenas com a palavra OK.",
    });

  console.log(
    "Resposta:",
    response.text
  );
}

main().catch(
  (error) => {
    console.error(
      "ERRO REAL DO GEMINI:"
    );

    console.error(error);

    process.exit(1);
  }
);