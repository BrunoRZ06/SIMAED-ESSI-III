import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChevronRight, Download, FileText, ScanLine, Search } from "lucide-react-native";
import type { MaterialExportAction, MaterialExportFormat } from "../../services/mockExamPdfService";

export type MaterialKind = "student" | "answer-sheet" | "answer-key";

type Props = {
  kind: MaterialKind;
  title: string;
  description: string;
  onOpen: () => void;
  exportActions: MaterialExportAction[];
  onExport: (format: MaterialExportFormat) => void;
  activeExport?: MaterialExportFormat | null;
  isExporting?: boolean;
};

const ICONS = {
  student: FileText,
  "answer-sheet": ScanLine,
  "answer-key": Search,
};

export function MaterialCard({ kind, title, description, onOpen, exportActions, onExport, activeExport = null, isExporting = false }: Props) {
  const Icon = ICONS[kind];

  return (
    <View style={styles.card}>
      <TouchableOpacity accessibilityRole="button" onPress={onOpen} style={styles.main}>
        <View style={[styles.iconBox, styles[kind]]}>
          <Icon size={20} color="#286D9B" />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.ready}>Pronto para visualizar</Text>
        </View>
        <ChevronRight size={20} color="#286D9B" />
      </TouchableOpacity>
      <View style={styles.actions}>
        {exportActions.map((action) => {
          const isActive = activeExport === action.format && isExporting;
          return (
            <TouchableOpacity
              key={action.format}
              accessibilityRole="button"
              accessibilityLabel={`${action.label}: ${title}`}
              accessibilityState={{ disabled: isExporting, busy: isActive }}
              disabled={isExporting}
              onPress={() => onExport(action.format)}
              style={[styles.downloadButton, isExporting && !isActive ? styles.disabledAction : null]}
            >
              {isActive ? <ActivityIndicator size="small" color="#286D9B" /> : action.format === "pdf" ? <Download size={14} color="#286D9B" /> : null}
              <Text style={styles.actionLabel}>{isActive ? "Preparando…" : action.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFF", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "#E8EAF0", gap: 12 },
  main: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  student: { backgroundColor: "#EAF2FF" },
  "answer-sheet": { backgroundColor: "#DCFCE7" },
  "answer-key": { backgroundColor: "#FEF3C7" },
  copy: { flex: 1, gap: 3 },
  title: { fontSize: 15, fontWeight: "700", color: "#111827" },
  description: { fontSize: 12, lineHeight: 17, color: "#667085" },
  ready: { color: "#027A48", fontSize: 10, fontWeight: "700", marginTop: 2 },
  actions: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: 8, borderTopWidth: 1, borderTopColor: "#F1F3F6", paddingTop: 10 },
  downloadButton: { minHeight: 34, flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 8, borderWidth: 1, borderColor: "#D0D5DD", borderRadius: 8 },
  disabledAction: { opacity: 0.4 },
  actionLabel: { color: "#286D9B", fontWeight: "600", fontSize: 12 },
});
