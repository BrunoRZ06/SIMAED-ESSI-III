import type { Request, Response } from "express";
import {
  getDescriptorsByConfiguration,
} from "../repositories/descriptor.repository.js";

type DescriptorParams = {
  disciplineCode: string;
  stageCode: string;
};

export async function getDescriptors(
  req: Request<DescriptorParams>,
  res: Response
) {
  try {
    const {
      disciplineCode,
      stageCode,
    } = req.params;

    const descriptors =
      await getDescriptorsByConfiguration(
        disciplineCode,
        stageCode
      );

    return res.status(200).json(descriptors);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar descritores",
    });
  }
}