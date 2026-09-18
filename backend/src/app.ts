import express from "express";
import cors from "cors";

import disciplineRouter from "./routes/discipline.routes.js";
import mockExamRouter from "./routes/mock-exam.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

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