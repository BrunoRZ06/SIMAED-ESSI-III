import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Gauge } from "lucide-react-native";

import { DIFFICULTY_OPTIONS } from "@/src/constants/mockExamOptions";

import type { DifficultyLevel } from "@/src/types/mock-exam";

interface DifficultySectionProps {
  value: DifficultyLevel;

  onChange: (
    value: DifficultyLevel
  ) => void;

  scale?: number;
}

export const DifficultySection: React.FC<
  DifficultySectionProps
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
        <Gauge
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
          Dificuldade do simulado
        </Text>
      </View>

      <View style={styles.row}>
        {DIFFICULTY_OPTIONS.map(
          (item) => {
            const isSelected =
              value === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                onPress={() =>
                  onChange(item.value)
                }
                style={[
                  styles.pill,

                  item.customBorder &&
                    !isSelected && {
                      borderColor:
                        item.customBorder,
                    },

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

                    item.customBorder &&
                      !isSelected && {
                        color:
                          item.customBorder,
                      },

                    isSelected &&
                      styles.pillTextSelected,

                    {
                      fontSize:
                        14 * scale,
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