import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  BookOpen,
  GraduationCap,
} from "lucide-react-native";

import { PrimaryButton } from "@/src/features/onboarding/components/PrimaryButton";

import { useMockExamParameters } from "@/src/hooks/useMockExamParameters";

import { SelectRow } from "./SelectRow";
import { GradeModal } from "./GradeModal";
import { SkillModal } from "./SkillModal";

import { QuestionCountSection } from "./configuration/QuestionCountSection";
import { DifficultySection } from "./configuration/DifficultySection";
import { DescriptorSection } from "./configuration/DescriptorSection";
import { QuestionTypeSection } from "./configuration/QuestionTypeSection";

import type { MockExamConfig } from "@/src/types/mock-exam";

interface StepConfigurationProps {
  config: MockExamConfig;

  onChangeConfig: (
    updates: Partial<MockExamConfig>
  ) => void;

  onGenerate: () => void;

  onChangeArea: () => void;

  scale?: number;
}

export const StepConfiguration: React.FC<
  StepConfigurationProps
> = ({
  config,
  onChangeConfig,
  onGenerate,
  onChangeArea,
  scale = 1,
}) => {
  const [
    isGradeModalOpen,
    setIsGradeModalOpen,
  ] = useState(false);

  const [
    isSkillModalOpen,
    setIsSkillModalOpen,
  ] = useState(false);

  const [
    validationError,
    setValidationError,
  ] = useState("");

  const {
    stages,
    descriptors,

    stagesLoading,
    descriptorsLoading,

    stagesError,
    descriptorsError,

    loadStages,
    loadDescriptors,
  } = useMockExamParameters(
    config.area,
    config.grade
  );

  const areaLabel =
    config.area === "portuguese"
      ? "Português"
      : config.area === "mathematics"
        ? "Matemática"
        : "Selecione uma área";

  const selectedStage =
    stages.find(
      (stage) =>
        stage.code === config.grade
    );

  const gradeLabel =
    selectedStage?.name ??
    "Selecione o ano/série";

  const handleSelectGrade = (
    gradeCode: string
  ) => {
    if (
      gradeCode !== config.grade
    ) {
      onChangeConfig({
        grade: gradeCode,
        skills: [],
      });
    }

    setValidationError("");

    setIsGradeModalOpen(false);
  };

  const handleOpenSkills = () => {
    if (!config.grade) {
      setValidationError(
        "Selecione o ano/série antes de escolher os descritores."
      );

      return;
    }

    setValidationError("");

    setIsSkillModalOpen(true);
  };

  const handleToggleSkill = (
    descriptorId: string
  ) => {
    const alreadySelected =
      config.skills.includes(
        descriptorId
      );

    const updatedSkills =
      alreadySelected
        ? config.skills.filter(
            (id) =>
              id !== descriptorId
          )
        : [
            ...config.skills,
            descriptorId,
          ];

    onChangeConfig({
      skills: updatedSkills,
    });

    setValidationError("");
  };

  const handleRemoveSkill = (
    descriptorId: string
  ) => {
    onChangeConfig({
      skills:
        config.skills.filter(
          (id) =>
            id !== descriptorId
        ),
    });
  };

  const handleGenerate = () => {
    if (!config.area) {
      setValidationError(
        "Selecione uma disciplina."
      );

      return;
    }

    if (!config.grade) {
      setValidationError(
        "Selecione o ano/série."
      );

      return;
    }

    if (
      config.skills.length === 0
    ) {
      setValidationError(
        "Selecione pelo menos um descritor."
      );

      return;
    }

    setValidationError("");

    onGenerate();
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        <Text
          style={[
            styles.title,
            {
              fontSize: 24 * scale,
              marginBottom:
                16 * scale,
            },
          ]}
        >
          Configurar simulado
        </Text>

        <SelectRow
          label="Área"
          value={areaLabel}
          icon={BookOpen}
          onPress={onChangeArea}
          scale={scale}
        />

        <SelectRow
          label="Ano/Série"
          value={gradeLabel}
          icon={GraduationCap}
          onPress={() => {
            setValidationError("");

            setIsGradeModalOpen(
              true
            );
          }}
          scale={scale}
        />

        <QuestionCountSection
          value={
            config.questionCount
          }
          onChange={(
            questionCount
          ) =>
            onChangeConfig({
              questionCount,
            })
          }
          scale={scale}
        />

        <DifficultySection
          value={
            config.difficulty
          }
          onChange={(
            difficulty
          ) =>
            onChangeConfig({
              difficulty,
            })
          }
          scale={scale}
        />

        <DescriptorSection
          descriptors={
            descriptors
          }
          selectedSkills={
            config.skills
          }
          onOpen={
            handleOpenSkills
          }
          onRemove={
            handleRemoveSkill
          }
          scale={scale}
        />

        <QuestionTypeSection
          value={
            config.questionType
          }
          onChange={(
            questionType
          ) =>
            onChangeConfig({
              questionType,
            })
          }
          scale={scale}
        />

        {validationError !==
          "" && (
          <Text
            style={[
              styles.validationError,
              {
                fontSize:
                  13 * scale,
              },
            ]}
          >
            {validationError}
          </Text>
        )}

        <View
          style={[
            styles.generateContainer,
            {
              marginTop:
                12 * scale,

              marginBottom:
                24 * scale,
            },
          ]}
        >
          <PrimaryButton
            title="✨ Gerar simulado"
            onPress={
              handleGenerate
            }
            scale={scale}
          />
        </View>
      </ScrollView>

      <GradeModal
        visible={
          isGradeModalOpen
        }
        selectedGrade={
          config.grade
        }
        stages={stages}
        loading={
          stagesLoading
        }
        error={
          stagesError
        }
        onSelect={
          handleSelectGrade
        }
        onRetry={
          loadStages
        }
        onClose={() =>
          setIsGradeModalOpen(
            false
          )
        }
        scale={scale}
      />

      <SkillModal
        visible={
          isSkillModalOpen
        }
        descriptors={
          descriptors
        }
        selectedSkills={
          config.skills
        }
        loading={
          descriptorsLoading
        }
        error={
          descriptorsError
        }
        onToggleSkill={
          handleToggleSkill
        }
        onRetry={
          loadDescriptors
        }
        onClose={() =>
          setIsSkillModalOpen(
            false
          )
        }
        scale={scale}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  title: {
    fontWeight: "700",
    color: "#090B2B",
  },

  validationError: {
    color: "#DC2626",
    fontWeight: "500",
    marginTop: 2,
  },

  generateContainer: {},
});