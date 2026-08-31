import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";


import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { FeatureItem } from "../components/FeatureItem";
import { IntroductionIllustration } from "../components/IntroductionIllustration";
import { LoginLink } from "../components/LoginLink";
import { Logo } from "../components/Logo";
import { PrimaryButton } from "../components/PrimaryButton";

interface IntroductionScreenProps {
  onStartPress: () => void;
  onLoginPress: () => void;
}

export const IntroductionScreen = ({
  onStartPress,
  onLoginPress,
}: IntroductionScreenProps) => {
  const { isTablet, scale: tabletScale, width, height } = useResponsiveScale();
  console.log("DEBUG RESPONSIVE:", { width, height, isTablet, tabletScale });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.content,
            isTablet && {
              maxWidth: 900,
              paddingHorizontal: 50 * tabletScale,
              paddingTop: 20 * tabletScale,
              paddingBottom: 45 * tabletScale,
            },
          ]}
        >
          {/* HERO */}
          <View style={[styles.hero, isTablet && styles.heroTablet]}>
            {/* ESQUERDA */}
            <View style={[styles.heroLeft, isTablet && { width: "55%" }]}>
              <Logo
                width={isTablet ? 180 * tabletScale : 180}
                offsetX={isTablet ? -15 * tabletScale : -30}
              />

              <Text
                style={[
                  styles.title,
                  isTablet && {
                    fontSize: 42 * tabletScale,
                    lineHeight: 49 * tabletScale,
                  },
                ]}
              >
                Pronto para{"\n"}
                criar seu{"\n"}
                simulado{"\n"}
                <Text style={styles.highlight}>SAEPE</Text> com IA
              </Text>

              <Text
                style={[
                  styles.description,
                  isTablet && {
                    fontSize: 15 * tabletScale,
                    lineHeight: 22 * tabletScale,
                    marginTop: 20 * tabletScale,
                    maxWidth: 500 * tabletScale,
                  },
                ]}
              >
                Em poucos passos, gere questões alinhadas ao exame e acompanhe o
                desempenho dos seus alunos
              </Text>

              <View
                style={[
                  styles.buttonContainer,
                  isTablet && { marginTop: 28 * tabletScale },
                ]}
              >
                <PrimaryButton
                  title="Gerar simulados agora"
                  onPress={onStartPress}
                  scale={tabletScale}
                />
              </View>

              <LoginLink onPress={onLoginPress} scale={tabletScale} />
            </View>

            {/* DIREITA */}
            <View
              style={[
                styles.illustrationContainer,
                isTablet && {
                  position: "relative",
                  width: 330 * tabletScale,
                  height: 330 * tabletScale,
                  marginLeft: 25 * tabletScale,
                  marginTop: 0,
                  right: undefined,
                  top: undefined,
                },
              ]}
            >
              <IntroductionIllustration />
            </View>
          </View>

          {/* FUNCIONALIDADES */}
          <View
            style={[
              styles.features,
              isTablet && { marginTop: 45 * tabletScale },
            ]}
          >
            <FeatureItem
              name="Target"
              title="Focado no SAEPE"
              description={"Questões alinhadas\ncom as habilidades\ndo exame"}
              scale={tabletScale}
              compact={!isTablet}
            />

            <View
              style={[
                styles.divider,
                isTablet && {
                  height: 65 * tabletScale,
                  marginHorizontal: 15 * tabletScale,
                },
              ]}
            />

            <FeatureItem
              name="Bot"
              title="IA que corrige"
              description={"Correção automática e\nfeedback inteligente"}
              scale={tabletScale}
              compact={!isTablet}
            />

            <View
              style={[
                styles.divider,
                isTablet && {
                  height: 65 * tabletScale,
                  marginHorizontal: 15 * tabletScale,
                },
              ]}
            />

            <FeatureItem
              name="BarChart2"
              title="Acompanhe resultados"
              description={"Relatórios claros para\ndecisões assertivas."}
              scale={tabletScale}
              compact={!isTablet}
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
    backgroundColor: "#F9F8FC",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContentTablet: {
    paddingVertical: 20,
  },
  content: {
    width: "100%",
    maxWidth: 390,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 30,
  },
  hero: {
    width: "100%",
    position: "relative",
  },
  heroTablet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLeft: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#090B2B",
  },
  highlight: {
    color: "#286D9B",
  },
  illustrationContainer: {
    width: 150,
    height: 150,
    position: "absolute",
    right: 0,
    top: 10,
  },
  description: {
    width: "100%",
    marginTop: 15,
    fontSize: 15,
    lineHeight: 22,
    color: "#68677F",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 30,
  },
  features: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 35,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
    marginTop: 4,
  },
});
