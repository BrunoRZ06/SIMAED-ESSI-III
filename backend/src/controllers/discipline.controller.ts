import type { Request, Response } from "express";
import { getAllActiveDisciplines } from "../repositories/discipline.repository.js";

export async function getDisciplines(
  req: Request,
  res: Response
) {
  try {
    const disciplines = await getAllActiveDisciplines();

    return res.status(200).json(disciplines);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar disciplinas",
    });
  }
}