import { Router } from "express";
import { getQuestionBank } from "../controllers/question-bank.controller.js";

const questionBankRouter = Router();

questionBankRouter.get("/", getQuestionBank);

export default questionBankRouter;
