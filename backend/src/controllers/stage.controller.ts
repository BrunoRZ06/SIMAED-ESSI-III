import type { Request, Response } from "express";

import { getStagesByDiscipline } from "../repositories/stage.repository.js";

type StageParams = {
  disciplineCode: string;
};

export async function getStages(
  req: Request<StageParams>,
  res: Response
) {
  try {
    const { disciplineCode } = req.params;

    const stages = await getStagesByDiscipline(disciplineCode);

    return res.status(200).json(stages);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar séries",
    });
  }
}