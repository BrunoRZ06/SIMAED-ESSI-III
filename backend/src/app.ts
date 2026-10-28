import express from "express";
import cors from "cors";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import disciplineRouter from "./routes/discipline.routes.js";
import mockExamRouter from "./routes/mock-exam.routes.js";
import questionBankRouter from "./routes/question-bank.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/question-assets",
  express.static(
    resolve(dirname(fileURLToPath(import.meta.url)), "../public/question-assets")
  )
);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use(
  "/disciplines",
  disciplineRouter
);

app.use(
  "/mock-exams",
  mockExamRouter
);

app.use(
  "/question-bank",
  questionBankRouter
);
