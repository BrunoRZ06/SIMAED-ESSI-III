import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FileText } from "lucide-react-native";

import { QUESTION_COUNT_OPTIONS } from "@/src/constants/mockExamOptions";

interface QuestionCountSectionProps {
  value: number;
  onChange: (value: number) => void;
  scale?: number;
}

export const QuestionCountSection: React.FC<
  QuestionCountSectionProps
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
        <FileText
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
          Quantidade de questões
        </Text>
      </View>

      <View style={styles.row}>
        {QUESTION_COUNT_OPTIONS.map(
          (quantity) => {
            const isSelected =
              value === quantity;

            return (
              <TouchableOpacity
                key={quantity}
                onPress={() =>
                  onChange(quantity)
                }
                style={[
                  styles.pill,

                  isSelected &&
                    styles.pillSelected,

                  {
                    paddingVertical:
                      8 * scale,

                    borderRadius:
                      20 * scale,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pillText,

                    isSelected &&
                      styles.pillTextSelected,

                    {
                      fontSize:
                        14 * scale,
                    },
                  ]}
                >
                  {quantity}
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
});