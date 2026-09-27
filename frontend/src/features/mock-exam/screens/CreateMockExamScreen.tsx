import React, {
  useState,
} from "react";

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  useRouter,
} from "expo-router";

import {
  useResponsiveScale,
} from "@/src/hooks/useResponsiveScale";

import {
  getDescriptors,
  getStages,
  requestMockExamGeneration,
} from "@/src/services/mockExamApi";

import {
  StepAreaSelection,
} from "../components/StepAreaSelection";

import {
  StepConfiguration,
} from "../components/StepConfiguration";

import {
  StepSuccess,
} from "../components/StepSuccess";

import {
  MockExamConfig,
} from "../../../types/mock-exam";

export const CreateMockExamScreen =
  () => {
    const router =
      useRouter();

    const {
      isTablet,
      scale: tabletScale,
    } =
      useResponsiveScale();

    const [
      currentStep,
      setCurrentStep,
    ] =
      useState<
        1 | 2 | 3
      >(1);

    const [
      isGenerating,
      setIsGenerating,
    ] =
      useState(false);

    const [
      mockExamConfig,
      setMockExamConfig,
    ] =
      useState<MockExamConfig>({
        area: null,
        grade: "",
        questionCount: 10,
        difficulty: "easy",
        skills: [],
        questionType: "new",
      });

    const handleBack = () => {
      if (
        currentStep > 1
      ) {
        setCurrentStep(
          (prev) =>
            (prev -
              1) as 1 | 2
        );
      } else {
        router.back();
      }
    };

    const handleUpdateConfig = (
      updates:
        Partial<MockExamConfig>
    ) => {
      setMockExamConfig(
        (prev) => ({
          ...prev,
          ...updates,
        })
      );
    };

    const handleSelectArea =
      async (
        area:
          MockExamConfig["area"]
      ) => {
        if (!area) {
          handleUpdateConfig({
            area: null,
            grade: "",
            skills: [],
          });

          return;
        }

        const disciplineCode =
          area ===
          "mathematics"
            ? "MATHEMATICS"
            : "PORTUGUESE";

        try {
          const stages =
            await getStages(
              disciplineCode
            );

          const currentStageIsValid =
            mockExamConfig.grade &&
            stages.some(
              (stage) =>
                stage.code ===
                mockExamConfig.grade
            );

          if (
            !currentStageIsValid
          ) {
            handleUpdateConfig({
              area,
              grade: "",
              skills: [],
            });

            return;
          }

          const descriptors =
            await getDescriptors(
              disciplineCode,
              mockExamConfig.grade
            );

          const validDescriptorIds =
            new Set(
              descriptors.map(
                (
                  descriptor
                ) =>
                  descriptor.id
              )
            );

          const validSkills =
            mockExamConfig.skills.filter(
              (skillId) =>
                validDescriptorIds.has(
                  skillId
                )
            );

          handleUpdateConfig({
            area,
            skills:
              validSkills,
          });
        } catch {
          handleUpdateConfig({
            area,
            grade: "",
            skills: [],
          });
        }
      };

    const handleGenerate =
      async () => {
        if (
          isGenerating
        ) {
          return;
        }

        if (
          !mockExamConfig.area
        ) {
          Alert.alert(
            "Configuração inválida",
            "Selecione uma disciplina."
          );

          return;
        }

        const disciplineCode =
          mockExamConfig.area ===
          "mathematics"
            ? "MATHEMATICS"
            : "PORTUGUESE";

        setIsGenerating(
          true
        );

        try {
          const result =
            await requestMockExamGeneration({
              disciplineCode,

              stageCode:
                mockExamConfig.grade,

              descriptorIds:
                mockExamConfig.skills,

              questionCount:
                mockExamConfig.questionCount,

              difficulty:
                mockExamConfig.difficulty,

              questionType:
                mockExamConfig.questionType,
            });

          if (
            !result.accepted
          ) {
            const message =
              result.errors
                ?.map(
                  (error) =>
                    error.message
                )
                .join("\n") ??
              result.message;

            Alert.alert(
              "Não foi possível gerar o simulado",
              message
            );

            return;
          }

          setCurrentStep(3);
        } catch {
          Alert.alert(
            "Erro",
            "Não foi possível iniciar a geração. Tente novamente."
          );
        } finally {
          setIsGenerating(
            false
          );
        }
      };

    return (
      <SafeAreaView
        style={
          styles.container
        }
      >
        <View
          style={[
            styles.content,

            isTablet &&
              styles.contentTablet,
          ]}
        >
          <View
            style={
              styles.header
            }
          >
            <TouchableOpacity
              onPress={
                handleBack
              }
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
              style={
                styles.backButton
              }
            >
              <ArrowLeft
                size={
                  24 *
                  tabletScale
                }
                color="#090B2B"
              />
            </TouchableOpacity>

            {currentStep <
              3 && (
              <View
                style={
                  styles.headerTitleContainer
                }
              >
                <Text
                  style={[
                    styles.headerTitle,

                    {
                      fontSize:
                        16 *
                        tabletScale,
                    },
                  ]}
                >
                  Gerar Simulado
                </Text>

                <Text
                  style={[
                    styles.headerStep,

                    {
                      fontSize:
                        12 *
                        tabletScale,
                    },
                  ]}
                >
                  Etapa{" "}
                  {currentStep}{" "}
                  de 3
                </Text>
              </View>
            )}
          </View>

          {currentStep ===
            1 && (
            <StepAreaSelection
              selectedArea={
                mockExamConfig.area
              }
              onSelectArea={
                handleSelectArea
              }
              onContinue={() =>
                setCurrentStep(
                  2
                )
              }
              scale={
                tabletScale
              }
            />
          )}

          {currentStep ===
            2 && (
            <StepConfiguration
              config={
                mockExamConfig
              }
              onChangeConfig={
                handleUpdateConfig
              }
              onGenerate={
                handleGenerate
              }
              onChangeArea={() =>
                setCurrentStep(
                  1
                )
              }
              isGenerating={
                isGenerating
              }
              scale={
                tabletScale
              }
            />
          )}

          {currentStep ===
            3 && (
            <StepSuccess
              config={
                mockExamConfig
              }
              onOpenMaterials={() =>
                router.push(
                  "/(tabs)"
                )
              }
              scale={
                tabletScale
              }
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F9F8FC",
    },

    content: {
      flex: 1,
      width: "100%",
      maxWidth: 420,
      alignSelf:
        "center",
      paddingHorizontal: 20,
      paddingTop: 10,
    },

    contentTablet: {
      maxWidth: 700,
      paddingHorizontal: 40,
      paddingTop: 20,
    },

    header: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom: 16,
      height: 44,
    },

    backButton: {
      padding: 4,
    },

    headerTitleContainer: {
      flex: 1,
      alignItems:
        "center",
      marginRight: 28,
    },

    headerTitle: {
      fontWeight:
        "700",
      color:
        "#090B2B",
    },

    headerStep: {
      color:
        "#286D9B",
      fontWeight:
        "600",
      marginTop: 2,
    },
  });