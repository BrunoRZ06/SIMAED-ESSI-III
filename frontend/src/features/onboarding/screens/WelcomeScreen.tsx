import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Logo } from "../components/Logo";
import { PrimaryButton } from "../components/PrimaryButton";
import { WelcomeIllustration } from "../components/WelcomeIllustration";

interface WelcomeScreenProps {
  onStartPress: () => void;
  onLoginPress: () => void;
}

export const WelcomeScreen = ({
  onStartPress,
  onLoginPress,
}: WelcomeScreenProps) => {
  const { width } = useWindowDimensions();

  // Flag para saber se é uma tela muito pequena ou tablet
  const isSmallDevice = width < 360;
  const isTablet = width > 768;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { maxWidth: isTablet ? 600 : "100%" }]}>
          <Logo width={isSmallDevice ? 90 : 120} />

          <WelcomeIllustration />

          <Text
            style={[
              styles.mainText,
              { fontSize: isSmallDevice ? 22 : isTablet ? 34 : 28 },
            ]}
          >
            Potencialize seus alunos com{" "}
            <Text style={styles.highlight}>SIMAED</Text>
          </Text>

          <Text
            style={[
              styles.mediumText,
              { fontSize: isSmallDevice ? 14 : isTablet ? 20 : 16 },
            ]}
          >
            Sua plataforma de simulados com inteligência artificial para o SAEPE.
          </Text>

          <Text style={styles.tinyText}>
            SIAMED - Sistema de Monitoramento da Aprendizagem Educacional
          </Text>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Vamos Começar"
              onPress={onStartPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07273F",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center", // Garante centralização em tablets
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  mainText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "600",
  },
  highlight: {
    color: "#149587",
  },
  mediumText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
    opacity: 0.9,
  },
  tinyText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 14,
    opacity: 0.7,
  },
  buttonContainer: {
    width: "100%", // Ocupa a largura do container pai
    maxWidth: 320, // Limita no tablet para não virar uma barra gigante
    marginTop: 24,
  },
});