import { Check, X } from "lucide-react-native";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SubjectArea } from "../types/mock-exam";

interface SkillModalProps {
  visible: boolean;
  area: SubjectArea;
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
  onClose: () => void;
  scale?: number;
}

const SAEPE_DESCRIPTORS_PORTUGUESE = [
  "D1 - Localizar informações explícitas em um texto",
  "D3 - Inferir o sentido de palavra ou expressão",
  "D4 - Inferir uma informação implícita em um texto",
  "D6 - Identificar o tema de um texto",
  "D14 - Distinguir um fato da opinião relativa a esse fato",
];

const SAEPE_DESCRIPTORS_MATH = [
  "D1 - Identificar a localização/movimentação de objeto em mapas/croquis",
  "D12 - Resolver problema envolvendo cálculo de perímetro",
  "D19 - Resolver problema envolvendo números naturais",
  "D24 - Identificar fração como representação que pode estar associada a diferentes significados",
];

export const SkillModal: React.FC<SkillModalProps> = ({
  visible,
  area,
  selectedSkills,
  onToggleSkill,
  onClose,
  scale = 1,
}) => {
  const descriptors =
    area === "mathematics"
      ? SAEPE_DESCRIPTORS_MATH
      : SAEPE_DESCRIPTORS_PORTUGUESE;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { fontSize: 18 * scale }]}>
              Descritores (SAEPE)
            </Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={22 * scale} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: 350 }}>
            {descriptors.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <TouchableOpacity
                  key={skill}
                  style={[styles.itemRow, isSelected && styles.itemRowSelected]}
                  onPress={() => onToggleSkill(skill)}
                >
                  <Text
                    style={[
                      styles.itemText,
                      isSelected && styles.itemTextSelected,
                      { fontSize: 13 * scale },
                    ]}
                  >
                    {skill}
                  </Text>
                  {isSelected && <Check size={18 * scale} color="#286D9B" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={[styles.doneButton, { marginTop: 16 * scale }]}
            onPress={onClose}
          >
            <Text style={[styles.doneButtonText, { fontSize: 15 * scale }]}>
              Concluir Seleção
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: {
    fontWeight: "700",
    color: "#090B2B",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  itemRowSelected: {
    backgroundColor: "#E0F2FE",
  },
  itemText: {
    color: "#334155",
    flex: 1,
    marginRight: 10,
  },
  itemTextSelected: {
    color: "#286D9B",
    fontWeight: "600",
  },
  doneButton: {
    backgroundColor: "#286D9B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
