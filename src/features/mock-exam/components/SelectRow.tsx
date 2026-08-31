import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChevronRight, LucideIcon } from "lucide-react-native";

interface SelectRowProps {
  label: string;
  value: string;
  icon: LucideIcon;
  onPress: () => void;
  scale?: number;
}

export const SelectRow: React.FC<SelectRowProps> = ({
  label,
  value,
  icon: Icon,
  onPress,
  scale = 1,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, { padding: 14 * scale, borderRadius: 14 * scale }]}
    >
      <View style={[styles.iconWrapper, { width: 44 * scale, height: 44 * scale, borderRadius: 12 * scale }]}>
        <Icon size={22 * scale} color="#286D9B" />
      </View>
      <View style={styles.textContent}>
        <Text style={[styles.label, { fontSize: 12 * scale }]}>{label}</Text>
        <Text style={[styles.value, { fontSize: 15 * scale }]}>{value}</Text>
      </View>
      <ChevronRight size={20 * scale} color="#94A3B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  iconWrapper: {
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  label: {
    color: "#64748B",
  },
  value: {
    fontWeight: "600",
    color: "#090B2B",
    marginTop: 2,
  },
});