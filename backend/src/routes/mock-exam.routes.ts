import { Router } from "express";

import { validateMockExamConfig } from "../controllers/mock-exam.controller.js";

const mockExamRouter = Router();

mockExamRouter.post(
  "/validate",
  validateMockExamConfig
);

export default mockExamRouter;