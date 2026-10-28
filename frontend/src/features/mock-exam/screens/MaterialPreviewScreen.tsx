import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { getQuestionAssetUrl, waitForMockExamGeneration, type MockExamGenerationStatus } from "@/src/services/mockExamApi";
import type { MaterialKind } from "../components/materials/MaterialCard";
import { getDisciplineLabel, getStageLabel } from "../components/materials/materialLabels";
import { buildMockExamMaterials, type MockExamMaterials } from "../services/mockExamMaterialService";

const TITLES: Record<MaterialKind, string> = {
  student: "Versão do aluno",
  "answer-sheet": "Cartão-resposta",
  "answer-key": "Gabarito do simulado",
};

export function MaterialPreviewScreen() {
  const router = useRouter();
  const { requestId, kind } = useLocalSearchParams<{ requestId?: string; kind?: string }>();
  const materialKind = (kind === "answer-sheet" || kind === "answer-key" ? kind : "student") as MaterialKind;
  const [generation, setGeneration] = useState<MockExamGenerationStatus | null>(null);
  const [materials, setMaterials] = useState<MockExamMaterials | null>(null);
  const [answerKeyView, setAnswerKeyView] = useState<"answers" | "skills">("answers");
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!requestId) { setError("Não encontramos os dados deste simulado."); return; }
    let active = true;
    setError(null);
    setGeneration(null);
    setMaterials(null);
    waitForMockExamGeneration(requestId)
      .then((result) => {
        const prepared = buildMockExamMaterials(result);
        if (active) {
          setGeneration(result);
          setMaterials(prepared);
        }
      })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : "Não foi possível carregar o material."); });
    return () => { active = false; };
  }, [requestId, reloadKey]);

  const discipline = getDisciplineLabel(generation?.disciplineCode);
  const stage = getStageLabel(generation?.stageCode);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Voltar aos materiais" onPress={() => router.back()} hitSlop={10}>
            <ArrowLeft size={22} color="#090B2B" />
          </TouchableOpacity>
          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle}>{TITLES[materialKind]}</Text>
            {generation ? <Text style={styles.headerSubtitle}>{discipline} — {stage}</Text> : null}
          </View>
        </View>

        {error ? (
          <View style={styles.state}>
            <Text style={styles.error}>{error}</Text>
            {requestId ? (
              <TouchableOpacity accessibilityRole="button" style={styles.retryButton} onPress={() => setReloadKey((value) => value + 1)}>
                <Text style={styles.retryText}>Tentar novamente</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : !generation || !materials ? (
          <View style={styles.state}><ActivityIndicator color="#286D9B" /><Text style={styles.muted}>Preparando visualização…</Text></View>
        ) : materialKind === "student" ? (
          <ScrollView contentContainerStyle={styles.paperWrap}>
            <View style={styles.paper}>
              <Text style={styles.examTitle}>SIMULADO</Text>
              <Text style={styles.examSubtitle}>{discipline} — {stage}</Text>
              <Text style={styles.studentLine}>Nome: __________________________________  Data: ____ / ____ / ______</Text>
              <Text style={styles.instructions}>{materials.student.instructions}</Text>
              {materials.student.questions.map((question) => (
                <View key={question.position} style={styles.question}>
                  {question.stimulusText ? <Text style={styles.bodyText}>{question.stimulusText}</Text> : null}
                  {question.stimulusAssetPath ? <Image source={{ uri: getQuestionAssetUrl(question.stimulusAssetPath) }} accessibilityLabel={question.stimulusAltText ?? "Imagem da questão"} resizeMode="contain" style={styles.stimulus} /> : null}
                  <Text style={styles.questionTitle}>{question.position}. {question.statement}</Text>
                  {question.alternatives.map((alternative) => <Text key={alternative.label} style={styles.bodyText}>{alternative.label}) {alternative.text}</Text>)}
                </View>
              ))}
            </View>
          </ScrollView>
        ) : materialKind === "answer-sheet" ? (
          <ScrollView contentContainerStyle={styles.paperWrap}>
            <View style={styles.answerPaper}>
              <Text style={styles.examTitle}>CARTÃO-RESPOSTA</Text>
              <Text style={styles.examSubtitle}>{discipline} — {stage}</Text>
              <Text style={styles.studentLine}>Nome: ______________________________________________</Text>
              <Text style={styles.studentLine}>Data: ____ / ____ / ______     Turma: ________________</Text>
              <Text style={styles.instructions}>Marque apenas uma alternativa por questão.</Text>
              {materials["answer-sheet"].questions.map((question) => (
                <View key={question.position} style={styles.answerRow}>
                  <Text style={styles.answerNumber}>{String(question.position).padStart(2, "0")}</Text>
                  {question.alternatives.map((label) => <View key={label} style={styles.bubble}><Text style={styles.bubbleText}>{label}</Text></View>)}
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.keyContent}>
            <View style={styles.sectionTabs}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: answerKeyView === "answers" }}
                onPress={() => setAnswerKeyView("answers")}
                style={answerKeyView === "answers" ? styles.tabSelected : styles.tab}
              >
                <Text style={answerKeyView === "answers" ? styles.activeTab : styles.inactiveTab}>Gabarito</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: answerKeyView === "skills" }}
                onPress={() => setAnswerKeyView("skills")}
                style={answerKeyView === "skills" ? styles.tabSelected : styles.tab}
              >
                <Text style={answerKeyView === "skills" ? styles.activeTab : styles.inactiveTab}>Habilidades</Text>
              </TouchableOpacity>
            </View>
            {answerKeyView === "answers" ? (
              <>
                <Text style={styles.sectionIntro}>Respostas corretas de cada questão</Text>
                <View style={styles.listCard}>
                  {materials["answer-key"].questions.map((question) => (
                    <View key={question.position} style={styles.keyRow}>
                      <Text style={styles.answerNumber}>{String(question.position).padStart(2, "0")}</Text>
                      <View style={styles.correctPill}><Text style={styles.correctText}>{question.correctAnswer}</Text></View>
                      <Text style={styles.descriptorPill}>{question.descriptor.description}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.sectionIntro}>Questões agrupadas por habilidade</Text>
                {materials["answer-key"].skills.map((skill) => (
                  <View key={skill.code} style={styles.skillCard}>
                    <Text style={styles.skillTitle}>{skill.description}</Text>
                    <Text style={styles.skillQuestions}>{skill.questionCount} questões: {skill.positions.map((position) => String(position).padStart(2, "0")).join(", ")}</Text>
                    <Text style={styles.skillCode}>{skill.code}</Text>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9F8FC" },
  page: { flex: 1, width: "100%", maxWidth: 480, alignSelf: "center", paddingHorizontal: 20, paddingTop: 10 },
  header: { minHeight: 54, flexDirection: "row", alignItems: "center", gap: 14, borderBottomWidth: 1, borderBottomColor: "#E9EAF0", marginBottom: 12 },
  headerCopy: { flex: 1, gap: 2 },
  headerTitle: { color: "#111827", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: "#286D9B", fontSize: 11, fontWeight: "600" },
  state: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  error: { color: "#B42318", textAlign: "center" },
  retryButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 9, backgroundColor: "#286D9B" },
  retryText: { color: "#FFF", fontSize: 12, fontWeight: "700" },
  muted: { color: "#667085" },
  paperWrap: { padding: 8, paddingBottom: 24 },
  paper: { backgroundColor: "#FFF", borderRadius: 14, padding: 20, borderWidth: 1, borderColor: "#EAECF0", gap: 12 },
  answerPaper: { backgroundColor: "#FFF", borderRadius: 14, padding: 20, borderWidth: 1, borderColor: "#EAECF0", gap: 12, alignItems: "center" },
  examTitle: { textAlign: "center", color: "#111827", fontSize: 16, fontWeight: "800", marginTop: 4 },
  examSubtitle: { textAlign: "center", color: "#344054", fontSize: 12, marginBottom: 10 },
  studentLine: { alignSelf: "stretch", color: "#344054", fontSize: 11, marginBottom: 5 },
  instructions: { alignSelf: "stretch", color: "#344054", fontSize: 11, marginVertical: 8 },
  question: { alignSelf: "stretch", borderTopWidth: 1, borderTopColor: "#EAECF0", paddingTop: 12, gap: 6 },
  questionTitle: { color: "#111827", fontSize: 12, lineHeight: 18, fontWeight: "700" },
  bodyText: { color: "#344054", fontSize: 11, lineHeight: 17 },
  stimulus: { width: "100%", height: 180, backgroundColor: "#F8FAFC" },
  answerRow: { width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 13, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#F2F4F7" },
  answerNumber: { color: "#111827", fontSize: 12, fontWeight: "700", width: 26 },
  bubble: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: "#98A2B3", alignItems: "center", justifyContent: "center" },
  bubbleText: { color: "#344054", fontSize: 10, fontWeight: "600" },
  keyContent: { gap: 12, paddingBottom: 24 },
  sectionTabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#D0D5DD", gap: 22 },
  tab: { paddingHorizontal: 2 },
  tabSelected: { borderBottomWidth: 2, borderBottomColor: "#175CD3", paddingHorizontal: 2 },
  activeTab: { color: "#175CD3", fontSize: 12, fontWeight: "700", paddingVertical: 10 },
  inactiveTab: { color: "#667085", fontSize: 12, paddingVertical: 10 },
  sectionIntro: { color: "#667085", fontSize: 12, marginTop: 6 },
  listCard: { backgroundColor: "#FFF", borderRadius: 14, paddingHorizontal: 12, borderWidth: 1, borderColor: "#EAECF0" },
  keyRow: { minHeight: 40, flexDirection: "row", alignItems: "center", gap: 10, borderBottomWidth: 1, borderBottomColor: "#F2F4F7" },
  correctPill: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#D1FADF", alignItems: "center", justifyContent: "center" },
  correctText: { color: "#039855", fontSize: 11, fontWeight: "800" },
  descriptorPill: { marginLeft: "auto", maxWidth: "65%", overflow: "hidden", color: "#7A271A", backgroundColor: "#FEE4E2", borderRadius: 7, paddingHorizontal: 7, paddingVertical: 4, fontSize: 9 },
  skillCard: { backgroundColor: "#FFF", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#EAECF0", gap: 7 },
  skillTitle: { color: "#111827", fontSize: 14, fontWeight: "700" },
  skillQuestions: { color: "#475467", fontSize: 12 },
  skillCode: { alignSelf: "flex-start", color: "#175CD3", borderWidth: 1, borderColor: "#84CAFF", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, fontSize: 10 },
});
