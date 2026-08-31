import IconWrapper from "@/src/components/ui/Icon/IconWrapper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FeatureItemProps {
  name: string;
  title: string;
  description: string;
  scale?: number;
  compact?: boolean;
}

export function FeatureItem({
  name,
  title,
  description,
  scale = 1,
  compact = false,
}: FeatureItemProps) {
  // Calculando o tamanho do ícone proporcionalmente ao container
  const iconSize = (compact ? 20 : 24) * scale;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            width: (compact ? 42 : 52) * scale,
            height: (compact ? 42 : 52) * scale,
            borderRadius: (compact ? 21 : 26) * scale,
            marginBottom: (compact ? 6 : 8) * scale,
          },
        ]}
      >
        <IconWrapper
          name={name} // Exemplo: "Camera", "Home", "User", etc.
          size={iconSize}
          color="#007AFF"
          fallbackText={title.charAt(0)} // Usa a 1ª letra do título se o ícone falhar
          fallbackColor="#2C3E8A"
        />
      </View>

      <Text style={[styles.title, { fontSize: (compact ? 10 : 12) * scale }]}>
        {title}
      </Text>

      <Text
        style={[
          styles.description,
          { fontSize: (compact ? 9 : 11) * scale, lineHeight: 14 * scale },
        ]}
      >
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  iconContainer: {
    backgroundColor: "#EBF3F8",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
  },
  description: {
    marginTop: 4,
    color: "#555555",
    textAlign: "center",
  },
});