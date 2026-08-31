import { XCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TagChipProps {
  label: string;
  onRemove: () => void;
  scale?: number;
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  onRemove,
  scale = 1,
}) => {
  return (
    <View
      style={[
        styles.chip,
        {
          paddingVertical: 6 * scale,
          paddingHorizontal: 12 * scale,
          borderRadius: 16 * scale,
        },
      ]}
    >
      <Text style={[styles.label, { fontSize: 12 * scale }]}>{label}</Text>
      <TouchableOpacity
        onPress={onRemove}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <XCircle size={16 * scale} color="#64748B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2F6",
    gap: 6,
    marginBottom: 6,
  },
  label: {
    color: "#334155",
    fontWeight: "500",
  },
});
