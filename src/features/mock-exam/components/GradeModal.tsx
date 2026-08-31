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

interface GradeModalProps {
  visible: boolean;
  selectedGrade: string;
  onSelect: (grade: string) => void;
  onClose: () => void;
  scale?: number;
}

const SAEPE_GRADES = [
  "2º Ano - Ensino Fundamental",
  "5º Ano - Ensino Fundamental",
  "9º Ano - Ensino Fundamental",
  "3º Ano - Ensino Médio",
];

export const GradeModal: React.FC<GradeModalProps> = ({
  visible,
  selectedGrade,
  onSelect,
  onClose,
  scale = 1,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { fontSize: 18 * scale }]}>
              Selecione o Ano/Série (SAEPE)
            </Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={22 * scale} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {SAEPE_GRADES.map((grade) => {
              const isSelected = selectedGrade === grade;
              return (
                <TouchableOpacity
                  key={grade}
                  style={[styles.itemRow, isSelected && styles.itemRowSelected]}
                  onPress={() => {
                    onSelect(grade);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      isSelected && styles.itemTextSelected,
                      { fontSize: 14 * scale },
                    ]}
                  >
                    {grade}
                  </Text>
                  {isSelected && <Check size={20 * scale} color="#286D9B" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    maxHeight: "60%",
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
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  itemRowSelected: {
    backgroundColor: "#E0F2FE",
  },
  itemText: {
    color: "#334155",
    fontWeight: "500",
  },
  itemTextSelected: {
    color: "#286D9B",
    fontWeight: "700",
  },
});
