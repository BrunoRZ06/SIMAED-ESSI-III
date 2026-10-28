import React from "react";
import { StyleSheet, Text, View } from "react-native";

import type { MockExamGenerationStatus } from "@/src/services/mockExamApi";
import { DIFFICULTY_OPTIONS, QUESTION_TYPE_OPTIONS } from "@/src/constants/mockExamOptions";
import { getDisciplineLabel, getStageLabel } from "./materialLabels";

type MockExamSummaryProps = {
  generation: MockExamGenerationStatus;
};

export function MockExamSummary({ generation }: MockExamSummaryProps) {
  const questionType = QUESTION_TYPE_OPTIONS.find(({ id }) => id === generation.questionType)?.label
    ?? generation.questionType;
  const difficulty = generation.difficulty
    ? DIFFICULTY_OPTIONS.find(({ value }) => value === generation.difficulty)?.label ?? generation.difficulty
    : "Não informada para questões existentes";
  const existingCount = generation.questions.filter((question) => question.sourceArchivedQuestionId).length;
  const aiCount = generation.questions.length - existingCount;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Resumo do simulado</Text>
      <View style={styles.grid}>
        <SummaryItem label="Disciplina" value={getDisciplineLabel(generation.disciplineCode)} />
        <SummaryItem label="Série/Ano" value={getStageLabel(generation.stageCode)} />
        <SummaryItem label="Questões" value={String(generation.questionCount)} />
        <SummaryItem label="Tipo" value={questionType} />
        <SummaryItem label="Status" value="Concluído" />
        <SummaryItem label="Criado em" value={new Date(generation.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} />
        <SummaryItem
          label="Dificuldade"
          value={generation.questionType === "combined" && generation.difficulty
            ? `${difficulty} nas questões inéditas`
            : difficulty}
        />
        <SummaryItem label="Origem" value={`${existingCount} existentes · ${aiCount} geradas por IA`} />
      </View>
      <Text style={styles.label}>Habilidades selecionadas</Text>
      {generation.descriptors.length > 0 ? (
        <View style={styles.skills}>
          {generation.descriptors.map((descriptor) => (
            <View key={descriptor.id} style={styles.skill}>
              <Text style={styles.skillCode}>{descriptor.code}</Text>
              <Text style={styles.skillDescription}>{descriptor.description}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.value}>Nenhuma habilidade disponível para exibição.</Text>
      )}
    </View>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E4E7EC", borderRadius: 14, padding: 14, gap: 10 },
  title: { color: "#101828", fontSize: 14, fontWeight: "700" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  item: { minWidth: "44%", flexGrow: 1, gap: 3 },
  label: { color: "#667085", fontSize: 10, fontWeight: "600" },
  value: { color: "#344054", fontSize: 11, lineHeight: 16 },
  skills: { gap: 7 },
  skill: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  skillCode: { color: "#175CD3", backgroundColor: "#EFF8FF", borderRadius: 5, overflow: "hidden", paddingHorizontal: 6, paddingVertical: 3, fontSize: 9, fontWeight: "700" },
  skillDescription: { flex: 1, color: "#344054", fontSize: 10, lineHeight: 15 },
});
