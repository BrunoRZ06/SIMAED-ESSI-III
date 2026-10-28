import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Archive, ArrowLeft, ClipboardList, Info } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { waitForMockExamGeneration, type MockExamGenerationStatus } from "@/src/services/mockExamApi";
import { MaterialCard, type MaterialKind } from "../components/materials/MaterialCard";
import { MockExamSummary } from "../components/materials/MockExamSummary";
import { getDisciplineLabel, getStageLabel } from "../components/materials/materialLabels";
import { exportMockExamMaterial, exportMockExamMaterialsZip, getMaterialExportActions, type MaterialExportFormat } from "../services/mockExamPdfService";
import { buildMockExamMaterials, type MockExamMaterials } from "../services/mockExamMaterialService";

export function MaterialsScreen() {
  const router = useRouter();
  const { requestId } = useLocalSearchParams<{ requestId?: string }>();
  const [generation, setGeneration] = useState<MockExamGenerationStatus | null>(null);
  const [materials, setMaterials] = useState<MockExamMaterials | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exportingAction, setExportingAction] = useState<{ kind: MaterialKind; format: MaterialExportFormat } | null>(null);
  const [isExportingArchive, setIsExportingArchive] = useState(false);
  const exportLock = useRef(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!requestId) {
      setError("Não encontramos os dados deste simulado.");
      return;
    }

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
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : "Não foi possível carregar os materiais.");
      });

    return () => { active = false; };
  }, [requestId, reloadKey]);

  const openMaterial = (kind: MaterialKind) => {
    if (!requestId) return;
    router.push({ pathname: "/mock-exam/material-preview", params: { requestId, kind } } as never);
  };

  const exportMaterial = async (kind: MaterialKind, format: MaterialExportFormat) => {
    if (!generation || !materials || exportLock.current) return;
    exportLock.current = true;
    setExportingAction({ kind, format });
    setDownloadMessage(null);
    setDownloadError(null);
    try {
      setDownloadMessage(await exportMockExamMaterial(materials[kind], format));
    } catch (reason) {
      setDownloadError(reason instanceof Error ? reason.message : "Não foi possível preparar o arquivo.");
    } finally {
      exportLock.current = false;
      setExportingAction(null);
    }
  };

  const exportAllMaterials = async () => {
    if (!materials || exportLock.current) return;
    exportLock.current = true;
    setIsExportingArchive(true);
    setDownloadMessage(null);
    setDownloadError(null);
    try {
      setDownloadMessage(await exportMockExamMaterialsZip(materials));
    } catch (reason) {
      setDownloadError(reason instanceof Error ? reason.message : "Não foi possível preparar o arquivo ZIP.");
    } finally {
      exportLock.current = false;
      setIsExportingArchive(false);
    }
  };

  const discipline = getDisciplineLabel(generation?.disciplineCode);
  const stage = getStageLabel(generation?.stageCode);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Voltar" onPress={() => router.back()} hitSlop={10}>
            <ArrowLeft size={22} color="#090B2B" />
          </TouchableOpacity>
          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle}>Materiais do simulado</Text>
            {generation ? <Text style={styles.headerSubtitle}>{discipline} — {stage}</Text> : null}
          </View>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Abrir simulados salvos" onPress={() => router.push("/(tabs)/simulados")} style={styles.historyButton}>
            <ClipboardList size={19} color="#286D9B" />
          </TouchableOpacity>
        </View>

        {error ? (
          <View style={styles.stateBox}>
            <Text style={styles.error}>{error}</Text>
            {requestId ? (
              <TouchableOpacity accessibilityRole="button" style={styles.retryButton} onPress={() => setReloadKey((value) => value + 1)}>
                <Text style={styles.retryText}>Tentar novamente</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity accessibilityRole="button" style={styles.retryButton} onPress={() => router.replace("/mock-exam/mock-exam")}>
                <Text style={styles.retryText}>Criar um simulado</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : !generation ? (
          <View style={styles.stateBox}><ActivityIndicator color="#286D9B" /><Text style={styles.muted}>Carregando materiais…</Text></View>
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.content}>
              <MockExamSummary generation={generation} />
              <Text style={styles.intro}>Baixe todos os arquivos em um ZIP ou escolha um material para visualizar, exportar, imprimir ou compartilhar.</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ disabled: Boolean(exportingAction) || isExportingArchive, busy: isExportingArchive }}
                disabled={Boolean(exportingAction) || isExportingArchive}
                onPress={() => void exportAllMaterials()}
                style={[styles.archiveButton, (Boolean(exportingAction) || isExportingArchive) ? styles.archiveButtonDisabled : null]}
              >
                {isExportingArchive ? <ActivityIndicator size="small" color="#FFF" /> : <Archive size={18} color="#FFF" />}
                <Text style={styles.archiveButtonText}>{isExportingArchive ? "Preparando ZIP…" : "Baixar todos os materiais (.zip)"}</Text>
              </TouchableOpacity>
              <MaterialCard kind="student" title="Versão do aluno" description="Prova completa para aplicação em sala." onOpen={() => openMaterial("student")} exportActions={getMaterialExportActions("student")} onExport={(format) => void exportMaterial("student", format)} activeExport={exportingAction?.kind === "student" ? exportingAction.format : null} isExporting={Boolean(exportingAction) || isExportingArchive} />
              <MaterialCard kind="answer-sheet" title="Cartão-resposta" description="Folha para marcação das alternativas e correção." onOpen={() => openMaterial("answer-sheet")} exportActions={getMaterialExportActions("answer-sheet")} onExport={(format) => void exportMaterial("answer-sheet", format)} activeExport={exportingAction?.kind === "answer-sheet" ? exportingAction.format : null} isExporting={Boolean(exportingAction) || isExportingArchive} />
              <MaterialCard kind="answer-key" title="Gabarito" description="Respostas corretas e habilidades avaliadas em cada questão." onOpen={() => openMaterial("answer-key")} exportActions={getMaterialExportActions("answer-key")} onExport={(format) => void exportMaterial("answer-key", format)} activeExport={exportingAction?.kind === "answer-key" ? exportingAction.format : null} isExporting={Boolean(exportingAction) || isExportingArchive} />

              <View style={styles.lockedCard}>
                <Text style={styles.lockedTitle}>Recurso exclusivo para quem tem login</Text>
                <Text style={styles.lockedCopy}>Correção automática dos cartões · Relatórios por habilidade · Histórico completo</Text>
                <Text style={styles.lockedLink}>Faça login para desbloquear esses recursos</Text>
              </View>
            </ScrollView>
            <View style={[styles.notice, downloadError ? styles.noticeError : null]}>
              <Info size={18} color={downloadError ? "#B42318" : "#286D9B"} />
              <Text style={[styles.noticeText, downloadError ? styles.noticeErrorText : null]}>
                {downloadError ?? downloadMessage ?? `Os materiais são montados com as ${generation.questionCount} questões deste simulado. Escolha um formato para baixar, salvar, compartilhar ou imprimir.`}
              </Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9F8FC" },
  page: { flex: 1, width: "100%", maxWidth: 480, alignSelf: "center", paddingHorizontal: 20, paddingTop: 10 },
  header: { minHeight: 54, flexDirection: "row", alignItems: "center", gap: 14, borderBottomWidth: 1, borderBottomColor: "#E9EAF0", marginBottom: 16 },
  headerCopy: { flex: 1, gap: 2 },
  headerTitle: { color: "#111827", fontSize: 16, fontWeight: "700" },
  headerSubtitle: { color: "#286D9B", fontSize: 11, fontWeight: "600" },
  historyButton: { width: 38, height: 38, borderRadius: 10, backgroundColor: "#EAF2FF", alignItems: "center", justifyContent: "center" },
  content: { gap: 12, paddingBottom: 16 },
  intro: { color: "#344054", fontSize: 13, marginBottom: 2 },
  archiveButton: { minHeight: 46, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, backgroundColor: "#286D9B", borderRadius: 12, paddingHorizontal: 18, paddingVertical: 12 },
  archiveButtonDisabled: { opacity: 0.6 },
  archiveButtonText: { color: "#FFF", fontSize: 14, fontWeight: "700", textAlign: "center" },
  lockedCard: { backgroundColor: "#F1EDFF", borderRadius: 16, borderWidth: 1, borderColor: "#E4DEFF", padding: 16, gap: 8 },
  lockedTitle: { color: "#3E2F78", fontWeight: "700", fontSize: 13 },
  lockedCopy: { color: "#5F5680", fontSize: 12, lineHeight: 18 },
  lockedLink: { color: "#5B35CC", fontSize: 12, fontWeight: "700", textAlign: "center", marginTop: 4 },
  notice: { flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: "#E4F5F0", borderRadius: 12, padding: 12, marginBottom: 8 },
  noticeText: { flex: 1, fontSize: 12, lineHeight: 17, color: "#344054" },
  noticeError: { backgroundColor: "#FEF3F2" },
  noticeErrorText: { color: "#B42318" },
  stateBox: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  muted: { color: "#667085", fontSize: 13 },
  error: { color: "#B42318", textAlign: "center", fontSize: 13 },
  retryButton: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10, backgroundColor: "#286D9B", marginTop: 4 },
  retryText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
});
