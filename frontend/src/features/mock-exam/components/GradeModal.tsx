import { Check, X } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { Stage } from "@/src/services/mockExamApi";

interface GradeModalProps {
  visible: boolean;
  selectedGrade: string;
  stages: Stage[];
  loading: boolean;
  error: string;
  onSelect: (grade: string) => void;
  onRetry: () => void;
  onClose: () => void;
  scale?: number;
}

export const GradeModal: React.FC<GradeModalProps> = ({
  visible,
  selectedGrade,
  stages,
  loading,
  error,
  onSelect,
  onRetry,
  onClose,
  scale = 1,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: 18 * scale,
                },
              ]}
            >
              Selecione o Ano/Série (SAEPE)
            </Text>

            <TouchableOpacity
              onPress={onClose}
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
            >
              <X
                size={22 * scale}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          {loading && (
            <View style={styles.statusContainer}>
              <ActivityIndicator />

              <Text
                style={[
                  styles.statusText,
                  {
                    fontSize: 13 * scale,
                  },
                ]}
              >
                Carregando séries...
              </Text>
            </View>
          )}

          {!loading && error !== "" && (
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.errorText,
                  {
                    fontSize: 13 * scale,
                  },
                ]}
              >
                {error}
              </Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={onRetry}
              >
                <Text
                  style={[
                    styles.retryButtonText,
                    {
                      fontSize: 13 * scale,
                    },
                  ]}
                >
                  Tentar novamente
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading &&
            !error &&
            stages.length === 0 && (
              <Text
                style={[
                  styles.statusText,
                  {
                    fontSize: 13 * scale,
                  },
                ]}
              >
                Nenhuma série disponível para esta disciplina.
              </Text>
            )}

          {!loading &&
            !error &&
            stages.length > 0 && (
              <ScrollView>
                {stages.map((stage) => {
                  const isSelected =
                    selectedGrade === stage.code;

                  return (
                    <TouchableOpacity
                      key={stage.id}
                      style={[
                        styles.itemRow,
                        isSelected &&
                          styles.itemRowSelected,
                      ]}
                      onPress={() =>
                        onSelect(stage.code)
                      }
                    >
                      <Text
                        style={[
                          styles.itemText,

                          isSelected &&
                            styles.itemTextSelected,

                          {
                            fontSize:
                              14 * scale,
                          },
                        ]}
                      >
                        {stage.name}
                      </Text>

                      {isSelected && (
                        <Check
                          size={20 * scale}
                          color="#286D9B"
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
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

  statusContainer: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  statusText: {
    color: "#64748B",
    textAlign: "center",
  },

  errorText: {
    color: "#DC2626",
    textAlign: "center",
    paddingVertical: 20,
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
    flex: 1,
    marginRight: 8,
  },

  itemTextSelected: {
    color: "#286D9B",
    fontWeight: "700",
  },

  retryButton: {
    borderWidth: 1,
    borderColor: "#286D9B",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  retryButtonText: {
    color: "#286D9B",
    fontWeight: "600",
  },
});