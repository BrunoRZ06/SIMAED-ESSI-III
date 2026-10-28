export function getDisciplineLabel(code?: string) {
  return code === "MATHEMATICS" ? "Matemática" : "Língua Portuguesa";
}

export function getStageLabel(code?: string) {
  const labels: Record<string, string> = {
    "2EF": "2º Ano do Ensino Fundamental",
    "5EF": "5º Ano do Ensino Fundamental",
    "9EF": "9º Ano do Ensino Fundamental",
    "3EM": "3ª série do Ensino Médio",
  };
  return labels[code ?? ""] ?? code ?? "";
}
