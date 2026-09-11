import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BookOpen, Check, CheckCircle2, Info } from "lucide-react-native";

import { PrimaryButton } from "@/src/features/onboarding/components/PrimaryButton";
import { MockExamConfig } from "../types/mock-exam";

interface StepSuccessProps {
  config: MockExamConfig;
  onOpenMaterials: () => void;
  scale?: number;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({
  config,
  onOpenMaterials,
  scale = 1,
}) => {
  const checklist = [
    "Versão do aluno",
    "Cartão-resposta",
    "Gabarito",
    "Arquivos para exportação",
  ];

  const areaLabel =
    config.area === "portuguese"
      ? "Língua Portuguesa"
      : config.area === "mathematics"
      ? "Matemática"
      : "Não informada";

  return (
    <View style={styles.container}>
      <View style={[styles.successBadge, { width: 76 * scale, height: 76 * scale, borderRadius: 38 * scale }]}>
        <Check size={42 * scale} color="#FFFFFF" />
      </View>

      <Text style={[styles.title, { fontSize: 24 * scale, marginTop: 16 * scale }]}>
        Seu simulado está <Text style={styles.highlight}>pronto! 🎉</Text>
      </Text>

      <Text style={[styles.subtitle, { fontSize: 14 * scale, marginTop: 8 * scale, marginBottom: 24 * scale }]}>
        Criamos automaticamente todos os materiais para você aplicar e corrigir.
      </Text>

      <View style={[styles.card, { padding: 18 * scale, borderRadius: 16 * scale }]}>
        <View style={styles.cardHeader}>
          <View style={[styles.headerIcon, { width: 44 * scale, height: 44 * scale, borderRadius: 12 * scale }]}>
            <BookOpen size={24 * scale} color="#286D9B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { fontSize: 17 * scale }]}>
              {areaLabel}
            </Text>
            <Text style={[styles.cardSubtitle, { fontSize: 12 * scale, marginTop: 2 * scale }]}>
              {config.grade} • {config.questionCount} questões • {config.skills.length} habilidade(s)
            </Text>
          </View>
        </View>

        <View style={styles.checklist}>
          {checklist.map((item) => (
            <View key={item} style={styles.checkItem}>
              <CheckCircle2 size={20 * scale} color="#10B981" />
              <Text style={[styles.checkText, { fontSize: 14 * scale }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.infoBox, { padding: 12 * scale, borderRadius: 12 * scale, marginTop: "auto" }]}>
        <Info size={20 * scale} color="#286D9B" />
        <Text style={[styles.infoText, { fontSize: 13 * scale }]}>
          Você usou 1 de 3 testes gratuitos para visitantes.
        </Text>
      </View>

      <View style={{ marginTop: 16 * scale }}>
        <PrimaryButton title="Abrir materiais" onPress={onOpenMaterials} scale={scale} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  successBadge: {
    backgroundColor: "#286D9B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#286D9B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontWeight: "700",
    color: "#090B2B",
    textAlign: "center",
  },
  highlight: {
    color: "#286D9B",
  },
  subtitle: {
    color: "#68677F",
    textAlign: "center",
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 14,
    marginBottom: 14,
  },
  headerIcon: {
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontWeight: "700",
    color: "#090B2B",
  },
  cardSubtitle: {
    color: "#68677F",
  },
  checklist: {
    gap: 10,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkText: {
    fontWeight: "500",
    color: "#334155",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    gap: 10,
    width: "100%",
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    color: "#0369A1",
    fontWeight: "500",
  },
});