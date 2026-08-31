import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  scale?: number;
}

export const PrimaryButton = ({
  title,
  onPress,
  loading = false,
  scale = 1,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["#2B688F", "#2CA097"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradient,
          scale > 1 && {
            paddingVertical: 16 * scale,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            scale > 1 && {
              fontSize: 16 * scale,
            },
          ]}
        >
          {loading ? "Carregando..." : title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },

  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
