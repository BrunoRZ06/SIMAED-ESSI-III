import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Files,
  Gauge,
  GraduationCap,
  Plus,
  Target,
} from "lucide-react-native";

import { PrimaryButton } from "@/src/features/onboarding/components/PrimaryButton";
import { SelectRow } from "./SelectRow";
import { TagChip } from "./TagChip";
import { GradeModal } from "./GradeModal";
import { SkillModal } from "./SkillModal";
import { DifficultyLevel, MockExamConfig, QuestionType } from "../types/mock-exam";

interface StepConfigurationProps {
  config: MockExamConfig;
  onChangeConfig: (updates: Partial<MockExamConfig>) => void;
  onGenerate: () => void;
  scale?: number;
}

export const StepConfiguration: React.FC<StepConfigurationProps> = ({
  config,
  onChangeConfig,
  onGenerate,
  scale = 1,
}) => {
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const quantityOptions = [10, 15, 20];
  const difficultyOptions: { label: string; value: DifficultyLevel; customBorder?: string }[] = [
    { label: "Fácil", value: "easy" },
    { label: "Médio", value: "medium" },
    { label: "Difícil", value: "hard", customBorder: "#EF4444" },
  ];

  const questionTypeOptions: { id: QuestionType; label: string }[] = [
    { id: "previous", label: "Questões de provas anteriores" },
    { id: "new", label: "Questões inéditas" },
    { id: "combined", label: "Combinação de anteriores e novas" },
  ];

  const handleToggleSkill = (skill: string) => {
    const exists = config.skills.includes(skill);
    const updated = exists
      ? config.skills.filter((s) => s !== skill)
      : [...config.skills, skill];
    onChangeConfig({ skills: updated });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChangeConfig({
      skills: config.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={[styles.title, { fontSize: 24 * scale, marginBottom: 16 * scale }]}>
          Configurar simulado
        </Text>

        <SelectRow
          label="Área"
          value={config.area === "portuguese" ? "Português" : "Matemática"}
          icon={BookOpen}
          onPress={() => {}}
          scale={scale}
        />

        <SelectRow
          label="Ano/Série"
          value={config.grade || "Selecione o ano/série"}
          icon={GraduationCap}
          onPress={() => setIsGradeModalOpen(true)}
          scale={scale}
        />

        {/* Quantidade */}
        <View style={[styles.sectionCard, { padding: 14 * scale }]}>
          <View style={styles.sectionHeader}>
            <FileText size={20 * scale} color="#286D9B" />
            <Text style={[styles.sectionTitle, { fontSize: 14 * scale }]}>Quantidade de questões</Text>
          </View>
          <View style={styles.rowPills}>
            {quantityOptions.map((qty) => {
              const isSelected = config.questionCount === qty;
              return (
                <TouchableOpacity
                  key={qty}
                  onPress={() => onChangeConfig({ questionCount: qty })}
                  style={[
                    styles.pill,
                    isSelected && styles.pillSelected,
                    { paddingVertical: 8 * scale, borderRadius: 20 * scale },
                  ]}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected, { fontSize: 14 * scale }]}>
                    {qty}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Dificuldade */}
        <View style={[styles.sectionCard, { padding: 14 * scale }]}>
          <View style={styles.sectionHeader}>
            <Gauge size={20 * scale} color="#286D9B" />
            <Text style={[styles.sectionTitle, { fontSize: 14 * scale }]}>Dificuldade do simulado</Text>
          </View>
          <View style={styles.rowPills}>
            {difficultyOptions.map((item) => {
              const isSelected = config.difficulty === item.value;
              return (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => onChangeConfig({ difficulty: item.value })}
                  style={[
                    styles.pill,
                    item.customBorder && !isSelected && { borderColor: item.customBorder },
                    isSelected && styles.pillSelected,
                    { paddingVertical: 8 * scale, borderRadius: 20 * scale },
                  ]}
                >
                  <Text
                    style={[
                      styles.pillText,
                      item.customBorder && !isSelected && { color: item.customBorder },
                      isSelected && styles.pillTextSelected,
                      { fontSize: 14 * scale },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Habilidades / Descritores */}
        <View style={[styles.sectionCard, { padding: 14 * scale }]}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeader}>
              <Target size={20 * scale} color="#286D9B" />
              <Text style={[styles.sectionTitle, { fontSize: 14 * scale }]}>Habilidades (Descritores)</Text>
            </View>
            <TouchableOpacity onPress={() => setIsSkillModalOpen(true)} style={styles.addButton}>
              <Plus size={16 * scale} color="#286D9B" />
              <Text style={[styles.addButtonText, { fontSize: 13 * scale }]}>Selecionar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagWrapper}>
            {config.skills.length === 0 ? (
              <Text style={[styles.emptySkillsText, { fontSize: 13 * scale }]}>
                Nenhum descritor selecionado. Clique em Selecionar.
              </Text>
            ) : (
              config.skills.map((skill) => (
                <TagChip key={skill} label={skill} onRemove={() => handleRemoveSkill(skill)} scale={scale} />
              ))
            )}
          </View>
        </View>

        {/* Tipo de questões */}
        <View style={[styles.sectionCard, { padding: 14 * scale }]}>
          <View style={styles.sectionHeader}>
            <Files size={20 * scale} color="#286D9B" />
            <Text style={[styles.sectionTitle, { fontSize: 14 * scale }]}>Tipo de questões</Text>
          </View>
          <View style={styles.rowCards}>
            {questionTypeOptions.map((item) => {
              const isSelected = config.questionType === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onChangeConfig({ questionType: item.id })}
                  style={[
                    styles.typeBox,
                    isSelected && styles.typeBoxSelected,
                    { padding: 10 * scale, borderRadius: 12 * scale },
                  ]}
                >
                  {isSelected && (
                    <CheckCircle2 size={16 * scale} color="#286D9B" style={styles.checkIcon} />
                  )}
                  <Text
                    style={[
                      styles.typeBoxText,
                      isSelected && styles.typeBoxTextSelected,
                      { fontSize: 11 * scale },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12 * scale, marginBottom: 24 * scale }}>
          <PrimaryButton
            title="✨ Gerar simulado"
            onPress={onGenerate}
            scale={scale}
          />
        </View>
      </ScrollView>

      {/* Modais */}
      <GradeModal
        visible={isGradeModalOpen}
        selectedGrade={config.grade}
        onSelect={(grade) => onChangeConfig({ grade })}
        onClose={() => setIsGradeModalOpen(false)}
        scale={scale}
      />

      <SkillModal
        visible={isSkillModalOpen}
        area={config.area}
        selectedSkills={config.skills}
        onToggleSkill={handleToggleSkill}
        onClose={() => setIsSkillModalOpen(false)}
        scale={scale}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  title: {
    fontWeight: "700",
    color: "#090B2B",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionHeaderBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#090B2B",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    color: "#286D9B",
    fontWeight: "600",
  },
  emptySkillsText: {
    color: "#94A3B8",
    fontStyle: "italic",
    paddingVertical: 4,
  },
  rowPills: {
    flexDirection: "row",
    gap: 8,
  },
  pill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  pillSelected: {
    backgroundColor: "#286D9B",
    borderColor: "#286D9B",
  },
  pillText: {
    fontWeight: "600",
    color: "#64748B",
  },
  pillTextSelected: {
    color: "#FFFFFF",
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  rowCards: {
    flexDirection: "row",
    gap: 8,
  },
  typeBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    minHeight: 70,
  },
  typeBoxSelected: {
    borderColor: "#286D9B",
    backgroundColor: "#E0F2FE",
  },
  checkIcon: {
    marginBottom: 4,
  },
  typeBoxText: {
    textAlign: "center",
    color: "#64748B",
    lineHeight: 14,
  },
  typeBoxTextSelected: {
    color: "#286D9B",
    fontWeight: "700",
  },
});