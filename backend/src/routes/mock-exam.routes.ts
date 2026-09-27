import {
  Router,
} from "express";

import {
  requestMockExamGeneration,
  validateMockExamConfig,
} from "../controllers/mock-exam.controller.js";

import {
  validateMockExamRequest,
} from "../middlewares/validate-mock-exam.middleware.js";

const mockExamRouter =
  Router();

mockExamRouter.post(
  "/validate",
  validateMockExamConfig
);

mockExamRouter.post(
  "/generate",
  validateMockExamRequest,
  requestMockExamGeneration
);

export default mockExamRouter;