export type Discipline = {
  id: string;
  code: string;
  name: string;
};

export type Stage = {
  id: string;
  code: string;
  name: string;
};

export type Descriptor = {
  id: string;
  code: string;
  description: string;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getDisciplines(): Promise<Discipline[]> {
  const response = await fetch(`${API_URL}/disciplines`);

  if (!response.ok) {
    throw new Error("Erro ao buscar disciplinas");
  }

  return response.json();
}

export async function getStages(
  disciplineCode: string
): Promise<Stage[]> {
  const response = await fetch(
    `${API_URL}/disciplines/${disciplineCode}/stages`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar séries");
  }

  return response.json();
}

export async function getDescriptors(
  disciplineCode: string,
  stageCode: string
): Promise<Descriptor[]> {
  const response = await fetch(
    `${API_URL}/disciplines/${disciplineCode}/stages/${stageCode}/descriptors`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar descritores");
  }

  return response.json();
}