import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { StepAreaSelection } from "../components/StepAreaSelection";
import { StepConfiguration } from "../components/StepConfiguration";
import { StepSuccess } from "../components/StepSuccess";
import { MockExamConfig } from "../types/mock-exam";

export const CreateMockExamScreen = () => {
  const router = useRouter();
  const { isTablet, scale: tabletScale } = useResponsiveScale();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [mockExamConfig, setMockExamConfig] = useState<MockExamConfig>({
    area: null,
    grade: "",
    questionCount: 10,
    difficulty: "easy",
    skills: [],
    questionType: "new",
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
    } else {
      router.back();
    }
  };

  const handleUpdateConfig = (updates: Partial<MockExamConfig>) => {
    setMockExamConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButton}
          >
            <ArrowLeft size={24 * tabletScale} color="#090B2B" />
          </TouchableOpacity>

          {currentStep < 3 && (
            <View style={styles.headerTitleContainer}>
              <Text style={[styles.headerTitle, { fontSize: 16 * tabletScale }]}>
                Gerar Simulado
              </Text>
              <Text style={[styles.headerStep, { fontSize: 12 * tabletScale }]}>
                Etapa {currentStep} de 3
              </Text>
            </View>
          )}
        </View>

        {currentStep === 1 && (
          <StepAreaSelection
            selectedArea={mockExamConfig.area}
            onSelectArea={(area) => handleUpdateConfig({ area })}
            onContinue={() => setCurrentStep(2)}
            scale={tabletScale}
          />
        )}

        {currentStep === 2 && (
          <StepConfiguration
            config={mockExamConfig}
            onChangeConfig={handleUpdateConfig}
            onGenerate={() => setCurrentStep(3)}
            scale={tabletScale}
          />
        )}

        {currentStep === 3 && (
          <StepSuccess
            config={mockExamConfig}
            onOpenMaterials={() => router.push("/(tabs)")}
            scale={tabletScale}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F8FC",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  contentTablet: {
    maxWidth: 700,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    height: 44,
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 28,
  },
  headerTitle: {
    fontWeight: "700",
    color: "#090B2B",
  },
  headerStep: {
    color: "#286D9B",
    fontWeight: "600",
    marginTop: 2,
  },
});