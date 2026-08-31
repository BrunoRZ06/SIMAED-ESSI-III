import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BookOpen, Calculator, Sparkles } from "lucide-react-native";

import { PrimaryButton } from "@/src/features/onboarding/components/PrimaryButton";
import { OptionCard } from "./OptionCard";
import { SubjectArea } from "../types/mock-exam";

interface StepAreaSelectionProps {
  selectedArea: SubjectArea;
  onSelectArea: (area: SubjectArea) => void;
  onContinue: () => void;
  scale?: number;
}

export const StepAreaSelection: React.FC<StepAreaSelectionProps> = ({
  selectedArea,
  onSelectArea,
  onContinue,
  scale = 1,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 26 * scale, lineHeight: 32 * scale }]}>
        Qual área você deseja{"\n"}
        <Text style={styles.highlight}>Trabalhar?</Text>
      </Text>

      <Text style={[styles.subtitle, { fontSize: 14 * scale, marginTop: 8 * scale, marginBottom: 24 * scale }]}>
        Escolha a disciplina para gerar questões alinhadas ao SAEPE.
      </Text>

      <OptionCard
        title="Matemática"
        description="Números, operações, geometria e resolução de problemas."
        icon={Calculator}
        isSelected={selectedArea === "mathematics"}
        onSelect={() => onSelectArea("mathematics")}
        scale={scale}
      />

      <OptionCard
        title="Português"
        description="Leitura, interpretação, gramática e análise linguística."
        icon={BookOpen}
        isSelected={selectedArea === "portuguese"}
        onSelect={() => onSelectArea("portuguese")}
        scale={scale}
      />

      <View style={[styles.infoBanner, { padding: 12 * scale, borderRadius: 12 * scale, marginTop: "auto" }]}>
        <View style={[styles.aiBadge, { width: 32 * scale, height: 32 * scale, borderRadius: 16 * scale }]}>
          <Sparkles size={16 * scale} color="#0E7490" />
        </View>
        <Text style={[styles.infoText, { fontSize: 13 * scale }]}>
          A IA irá gerar questões com base nas habilidades avaliadas pelo SAEPE
        </Text>
      </View>

      <View style={{ marginTop: 16 * scale }}>
        <PrimaryButton
          title="Continuar"
          onPress={onContinue}
          scale={scale}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    color: "#090B2B",
  },
  highlight: {
    color: "#286D9B",
  },
  subtitle: {
    color: "#68677F",
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    gap: 10,
    marginBottom: 16,
  },
  aiBadge: {
    backgroundColor: "#BAE6FD",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    flex: 1,
    color: "#0369A1",
    fontWeight: "500",
    lineHeight: 18,
  },
});