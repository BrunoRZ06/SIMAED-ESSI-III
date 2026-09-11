import { Router } from "express";

import { getDisciplines } from "../controllers/discipline.controller.js";
import { getStages } from "../controllers/stage.controller.js";
import { getDescriptors } from "../controllers/descriptor.controller.js";

const disciplineRouter = Router();

disciplineRouter.get(
  "/",
  getDisciplines
);

disciplineRouter.get(
  "/:disciplineCode/stages",
  getStages
);

disciplineRouter.get(
  "/:disciplineCode/stages/:stageCode/descriptors",
  getDescriptors
);

export default disciplineRouter;