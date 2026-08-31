import React from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";

export function WelcomeIllustration() {
  const { width, height } = useWindowDimensions();

  // Calcula tamanho proporcional mantendo limites razoáveis
  const imageWidth = Math.min(width * 0.8, 400); 
  const imageHeight = Math.min(height * 0.3, 300);

  return (
    <Image
      source={require("../../../../assets/images/welcome-illustration.png")}
      style={[
        styles.illustration,
        {
          width: imageWidth,
          height: imageHeight,
        },
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  illustration: {
    marginTop: 12,
  },
});