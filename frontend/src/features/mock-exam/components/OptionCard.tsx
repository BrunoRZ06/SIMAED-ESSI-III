import { CheckCircle2, Circle, LucideIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: () => void;
  scale?: number;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon: Icon,
  isSelected,
  onSelect,
  scale = 1,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        {
          padding: 16 * scale,
          borderRadius: 16 * scale,
          marginBottom: 14 * scale,
        },
      ]}
    >
      <View
        style={[
          styles.iconWrapper,
          { width: 48 * scale, height: 48 * scale, borderRadius: 12 * scale },
        ]}
      >
        <Icon size={24 * scale} color="#286D9B" />
      </View>

      <View style={styles.textContent}>
        <Text style={[styles.title, { fontSize: 18 * scale }]}>{title}</Text>
        <Text
          style={[
            styles.description,
            { fontSize: 13 * scale, marginTop: 4 * scale },
          ]}
        >
          {description}
        </Text>
      </View>

      {isSelected ? (
        <CheckCircle2 size={24 * scale} color="#286D9B" />
      ) : (
        <Circle size={24 * scale} color="#CBD5E1" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSelected: {
    borderColor: "#286D9B",
    backgroundColor: "#F8FAFC",
  },
  iconWrapper: {
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontWeight: "700",
    color: "#090B2B",
  },
  description: {
    color: "#68677F",
    lineHeight: 18,
  },
});
