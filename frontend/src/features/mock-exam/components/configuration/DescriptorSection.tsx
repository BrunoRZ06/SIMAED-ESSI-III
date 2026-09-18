import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Plus,
  Target,
} from "lucide-react-native";

import type { Descriptor } from "@/src/services/mockExamApi";

import { TagChip } from "../TagChip";

interface DescriptorSectionProps {
  descriptors: Descriptor[];

  selectedSkills: string[];

  onOpen: () => void;

  onRemove: (
    descriptorId: string
  ) => void;

  scale?: number;
}

export const DescriptorSection: React.FC<
  DescriptorSectionProps
> = ({
  descriptors,
  selectedSkills,
  onOpen,
  onRemove,
  scale = 1,
}) => {
  const selectedDescriptors =
    descriptors.filter(
      (descriptor) =>
        selectedSkills.includes(
          descriptor.id
        )
    );

  return (
    <View
      style={[
        styles.sectionCard,
        {
          padding: 14 * scale,
        },
      ]}
    >
      <View
        style={
          styles.sectionHeaderBetween
        }
      >
        <View style={styles.sectionHeader}>
          <Target
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
            Habilidades (Descritores)
          </Text>
        </View>

        <TouchableOpacity
          onPress={onOpen}
          style={styles.addButton}
        >
          <Plus
            size={16 * scale}
            color="#286D9B"
          />

          <Text
            style={[
              styles.addButtonText,
              {
                fontSize: 13 * scale,
              },
            ]}
          >
            Selecionar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagWrapper}>
        {selectedDescriptors.length ===
        0 ? (
          <Text
            style={[
              styles.emptyText,
              {
                fontSize: 13 * scale,
              },
            ]}
          >
            Nenhum descritor selecionado.
            Clique em Selecionar.
          </Text>
        ) : (
          selectedDescriptors.map(
            (descriptor) => (
              <TagChip
                key={descriptor.id}
                label={descriptor.code}
                onRemove={() =>
                  onRemove(
                    descriptor.id
                  )
                }
                scale={scale}
              />
            )
          )
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

  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  emptyText: {
    color: "#94A3B8",
    fontStyle: "italic",
    paddingVertical: 4,
  },
});