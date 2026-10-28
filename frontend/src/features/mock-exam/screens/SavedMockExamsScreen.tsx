import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BookOpen, ChevronRight, ClipboardList, Plus, RefreshCw } from "lucide-react-native";
import { useRouter } from "expo-router";

import { getMockExamGenerationStatus, type MockExamGenerationStatus } from "@/src/services/mockExamApi";
import { getDisciplineLabel, getStageLabel } from "../components/materials/materialLabels";
import { getSavedMockExams, type SavedMockExam } from "../services/mockExamHistoryService";

type HistoryItem = {
  saved: SavedMockExam;
  generation?: MockExamGenerationStatus;
  error?: string;
};

export function SavedMockExamsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadHistory = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setLoadError(null);

    try {
      const saved = await getSavedMockExams();
      const results = await Promise.all(saved.map(async (entry): Promise<HistoryItem> => {
        try {
          return { saved: entry, generation: await getMockExamGenerationStatus(entry.requestId) };
        } catch (error) {
          return { saved: entry, error: error instanceof Error ? error.message : "Não foi possível consultar o simulado." };
        }
      }));
      setItems(results);
    } catch {
      setLoadError("Não foi possível ler o histórico salvo neste dispositivo.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { void loadHistory(); }, [loadHistory]);

  const openMaterials = (requestId: string) => {
    router.push({ pathname: "/mock-exam/materials", params: { requestId } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerIcon}><ClipboardList size={22} color="#286D9B" /></View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Simulados</Text>
            <Text style={styles.subtitle}>Simulados criados neste dispositivo</Text>
          </View>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Atualizar lista" onPress={() => void loadHistory(true)} style={styles.refreshButton}>
            <RefreshCw size={18} color="#286D9B" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.state}><ActivityIndicator color="#286D9B" /><Text style={styles.muted}>Carregando simulados…</Text></View>
        ) : loadError ? (
          <View style={styles.emptyState}><Text style={styles.error}>{loadError}</Text><TouchableOpacity onPress={() => void loadHistory()} style={styles.outlineButton}><Text style={styles.outlineText}>Tentar novamente</Text></TouchableOpacity></View>
        ) : items.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}><BookOpen size={28} color="#286D9B" /></View>
            <Text style={styles.emptyTitle}>Nenhum simulado salvo ainda</Text>
            <Text style={styles.emptyCopy}>Os simulados que você gerar aparecerão aqui, mesmo usando o app como visitante.</Text>
            <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/mock-exam/mock-exam")} style={styles.primaryButton}>
              <Plus size={18} color="#FFF" /><Text style={styles.primaryText}>Criar simulado</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.list}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void loadHistory(true)} tintColor="#286D9B" />}
          >
            <Text style={styles.listIntro}>{items.length} {items.length === 1 ? "simulado salvo" : "simulados salvos"}</Text>
            {items.map(({ saved, generation, error }) => {
              const isCompleted = generation?.status === "COMPLETED";
              const statusText = error
                ? "Indisponível no servidor"
                : generation?.status === "COMPLETED"
                  ? "Concluído"
                  : generation?.status === "FAILED"
                    ? "Falhou"
                    : generation?.status === "PROCESSING" || generation?.status === "PENDING"
                      ? "Em andamento"
                      : "Aguardando consulta";
              return (
                <TouchableOpacity
                  accessibilityRole="button"
                  key={saved.requestId}
                  onPress={() => openMaterials(saved.requestId)}
                  style={styles.card}
                >
                  <View style={styles.cardIcon}><BookOpen size={21} color="#286D9B" /></View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{getDisciplineLabel(saved.disciplineCode)}</Text>
                    <Text style={styles.cardSubtitle}>{getStageLabel(saved.stageCode)} · {saved.questionCount} questões</Text>
                    <Text style={styles.cardDate}>{new Date(saved.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</Text>
                    <Text style={[styles.status, isCompleted ? styles.statusSuccess : null, error ? styles.statusError : null]}>{statusText}</Text>
                  </View>
                  <ChevronRight size={20} color="#286D9B" />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/mock-exam/mock-exam")} style={styles.newButton}>
              <Plus size={18} color="#286D9B" /><Text style={styles.newButtonText}>Criar outro simulado</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9F8FC" },
  page: { flex: 1, width: "100%", maxWidth: 600, alignSelf: "center", paddingHorizontal: 20, paddingTop: 12 },
  header: { minHeight: 58, flexDirection: "row", alignItems: "center", gap: 12, borderBottomWidth: 1, borderBottomColor: "#E9EAF0", marginBottom: 16 },
  headerIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#E0F2FE", alignItems: "center", justifyContent: "center" },
  headerText: { flex: 1, gap: 3 },
  title: { color: "#090B2B", fontSize: 18, fontWeight: "700" },
  subtitle: { color: "#667085", fontSize: 12 },
  refreshButton: { padding: 10 },
  list: { gap: 12, paddingBottom: 24 },
  listIntro: { color: "#667085", fontSize: 13, marginBottom: 2 },
  card: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E4E7EC", borderRadius: 16, padding: 14 },
  cardIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#EAF2FF", alignItems: "center", justifyContent: "center" },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: { color: "#101828", fontSize: 14, fontWeight: "700" },
  cardSubtitle: { color: "#475467", fontSize: 12 },
  cardDate: { color: "#667085", fontSize: 11, marginTop: 2 },
  status: { alignSelf: "flex-start", color: "#175CD3", backgroundColor: "#EFF8FF", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, fontSize: 10, fontWeight: "600", marginTop: 3 },
  statusSuccess: { color: "#027A48", backgroundColor: "#ECFDF3" },
  statusError: { color: "#B42318", backgroundColor: "#FEF3F2" },
  state: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  muted: { color: "#667085", fontSize: 13 },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, paddingHorizontal: 20 },
  emptyIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: "#E0F2FE", alignItems: "center", justifyContent: "center" },
  emptyTitle: { color: "#101828", fontSize: 16, fontWeight: "700", textAlign: "center" },
  emptyCopy: { color: "#667085", fontSize: 13, lineHeight: 19, textAlign: "center", maxWidth: 340 },
  error: { color: "#B42318", textAlign: "center", fontSize: 13 },
  primaryButton: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 10, backgroundColor: "#286D9B", marginTop: 8 },
  primaryText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  outlineButton: { borderWidth: 1, borderColor: "#286D9B", borderRadius: 9, paddingHorizontal: 16, paddingVertical: 10 },
  outlineText: { color: "#286D9B", fontSize: 13, fontWeight: "700" },
  newButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, padding: 13, borderWidth: 1, borderColor: "#B2DDFF", borderRadius: 12, backgroundColor: "#F5FAFF", marginTop: 4 },
  newButtonText: { color: "#175CD3", fontSize: 13, fontWeight: "700" },
});
