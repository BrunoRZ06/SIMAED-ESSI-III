import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  CheckCircle2,
  Files,
} from "lucide-react-native";

import { QUESTION_TYPE_OPTIONS } from "@/src/constants/mockExamOptions";
import type { QuestionType } from "@/src/types/mock-exam";

interface QuestionTypeSectionProps {
  value: QuestionType;

  onChange: (
    value: QuestionType
  ) => void;

  scale?: number;
}

export const QuestionTypeSection: React.FC<
  QuestionTypeSectionProps
> = ({
  value,
  onChange,
  scale = 1,
}) => {
  return (
    <View
      style={[
        styles.sectionCard,
        {
          padding: 14 * scale,
        },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Files
          size={20 * scale}
          color="#286D9B"
        />

        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: 14 * scale,
            },
          ]}
        >
          Tipo de questões
        </Text>
      </View>

      <View style={styles.row}>
        {QUESTION_TYPE_OPTIONS.map(
          (item) => {
            const isSelected =
              value === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  onChange(item.id)
                }
                style={[
                  styles.typeBox,

                  isSelected &&
                    styles.typeBoxSelected,

                  {
                    padding: 10 * scale,

                    borderRadius:
                      12 * scale,
                  },
                ]}
              >
                {isSelected && (
                  <CheckCircle2
                    size={16 * scale}
                    color="#286D9B"
                    style={
                      styles.checkIcon
                    }
                  />
                )}

                <Text
                  style={[
                    styles.typeBoxText,

                    isSelected &&
                      styles.typeBoxTextSelected,

                    {
                      fontSize:
                        11 * scale,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  sectionTitle: {
    fontWeight: "600",
    color: "#090B2B",
  },

  row: {
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