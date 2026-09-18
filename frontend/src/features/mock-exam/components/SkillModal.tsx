import {
  Check,
  X,
} from "lucide-react-native";

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

import type { Descriptor } from "@/src/services/mockExamApi";

interface SkillModalProps {
  visible: boolean;

  descriptors: Descriptor[];

  selectedSkills: string[];

  loading: boolean;

  error: string;

  onToggleSkill: (
    descriptorId: string
  ) => void;

  onRetry: () => void;

  onClose: () => void;

  scale?: number;
}

export const SkillModal: React.FC<
  SkillModalProps
> = ({
  visible,
  descriptors,
  selectedSkills,
  loading,
  error,
  onToggleSkill,
  onRetry,
  onClose,
  scale = 1,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={
        onClose
      }
    >
      <View
        style={
          styles.overlay
        }
      >
        <View
          style={
            styles.content
          }
        >
          <View
            style={
              styles.header
            }
          >
            <Text
              style={[
                styles.title,
                {
                  fontSize:
                    18 *
                    scale,
                },
              ]}
            >
              Descritores (SAEPE)
            </Text>

            <TouchableOpacity
              onPress={
                onClose
              }
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
            >
              <X
                size={
                  22 * scale
                }
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          {/* Carregamento */}
          {loading && (
            <View
              style={
                styles.statusContainer
              }
            >
              <ActivityIndicator />

              <Text
                style={[
                  styles.statusText,
                  {
                    fontSize:
                      13 *
                      scale,
                  },
                ]}
              >
                Carregando descritores...
              </Text>
            </View>
          )}

          {/* Erro */}
          {!loading &&
            error !== "" && (
              <View
                style={
                  styles.statusContainer
                }
              >
                <Text
                  style={[
                    styles.errorText,
                    {
                      fontSize:
                        13 *
                        scale,
                    },
                  ]}
                >
                  {error}
                </Text>

                <TouchableOpacity
                  style={
                    styles.retryButton
                  }
                  onPress={
                    onRetry
                  }
                >
                  <Text
                    style={[
                      styles.retryButtonText,
                      {
                        fontSize:
                          13 *
                          scale,
                      },
                    ]}
                  >
                    Tentar novamente
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          {/* Lista vazia */}
          {!loading &&
            error === "" &&
            descriptors.length ===
              0 && (
              <View
                style={
                  styles.statusContainer
                }
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      fontSize:
                        13 *
                        scale,
                    },
                  ]}
                >
                  Nenhum descritor
                  disponível para
                  esta combinação
                  de disciplina e
                  série.
                </Text>
              </View>
            )}

          {/* Lista */}
          {!loading &&
            error === "" &&
            descriptors.length >
              0 && (
              <ScrollView
                style={
                  styles.scroll
                }
                showsVerticalScrollIndicator={
                  false
                }
              >
                {descriptors.map(
                  (
                    descriptor
                  ) => {
                    const isSelected =
                      selectedSkills.includes(
                        descriptor.id
                      );

                    return (
                      <TouchableOpacity
                        key={
                          descriptor.id
                        }
                        style={[
                          styles.itemRow,

                          isSelected &&
                            styles.itemRowSelected,
                        ]}
                        onPress={() =>
                          onToggleSkill(
                            descriptor.id
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.itemText,

                            isSelected &&
                              styles.itemTextSelected,

                            {
                              fontSize:
                                13 *
                                scale,
                            },
                          ]}
                        >
                          <Text
                            style={
                              styles.descriptorCode
                            }
                          >
                            {
                              descriptor.code
                            }
                          </Text>

                          {" - "}

                          {
                            descriptor.description
                          }
                        </Text>

                        {isSelected && (
                          <Check
                            size={
                              18 *
                              scale
                            }
                            color="#286D9B"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  }
                )}
              </ScrollView>
            )}

          {/* Concluir */}
          <TouchableOpacity
            style={[
              styles.doneButton,
              {
                marginTop:
                  16 *
                  scale,
              },
            ]}
            onPress={
              onClose
            }
          >
            <Text
              style={[
                styles.doneButtonText,
                {
                  fontSize:
                    15 *
                    scale,
                },
              ]}
            >
              Concluir Seleção
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles =
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor:
        "rgba(0,0,0,0.4)",
      justifyContent:
        "flex-end",
    },

    content: {
      backgroundColor:
        "#FFFFFF",

      borderTopLeftRadius:
        20,

      borderTopRightRadius:
        20,

      padding: 20,

      maxHeight: "80%",
    },

    header: {
      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems: "center",

      marginBottom: 16,

      paddingBottom: 12,

      borderBottomWidth:
        1,

      borderBottomColor:
        "#E2E8F0",
    },

    title: {
      fontWeight: "700",
      color: "#090B2B",
    },

    scroll: {
      maxHeight: 350,
    },

    statusContainer: {
      alignItems: "center",

      justifyContent:
        "center",

      paddingVertical: 24,

      gap: 10,
    },

    statusText: {
      color: "#64748B",

      textAlign: "center",
    },

    errorText: {
      color: "#DC2626",

      textAlign: "center",
    },

    retryButton: {
      borderWidth: 1,

      borderColor:
        "#286D9B",

      borderRadius: 8,

      paddingHorizontal:
        16,

      paddingVertical: 8,
    },

    retryButtonText: {
      color: "#286D9B",

      fontWeight: "600",
    },

    itemRow: {
      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems: "center",

      paddingVertical: 12,

      paddingHorizontal:
        10,

      borderRadius: 8,

      marginBottom: 6,
    },

    itemRowSelected: {
      backgroundColor:
        "#E0F2FE",
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

    descriptorCode: {
      fontWeight: "700",
    },

    doneButton: {
      backgroundColor:
        "#286D9B",

      paddingVertical: 12,

      borderRadius: 10,

      alignItems: "center",
    },

    doneButtonText: {
      color: "#FFFFFF",

      fontWeight: "600",
    },
  });