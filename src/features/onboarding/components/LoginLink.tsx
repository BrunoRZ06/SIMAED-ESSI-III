import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface LoginLinkProps {
  onPress: () => void;
  scale?: number;
}

export const LoginLink = ({
  onPress,
  scale = 1,
}: LoginLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        scale > 1 && {
          marginTop: 20 * scale,
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
        Já tem uma conta?{" "}
        <Text style={styles.link}>Entrar &gt;</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  text: {
    fontSize: 16,
    color: "#666",
  },

  link: {
    color: "#2C3E8A",
    fontWeight: "600",
  },
});