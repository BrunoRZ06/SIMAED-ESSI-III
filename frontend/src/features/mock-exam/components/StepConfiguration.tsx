import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BookOpen,
  CheckCircle2,
  FileText,
  Files,
  Gauge,
  GraduationCap,
  Plus,
  Target,
} from "lucide-react-native";

import { PrimaryButton } from "@/src/features/onboarding/components/PrimaryButton";

import {
  Descriptor,
  getDescriptors,
  getStages,
  Stage,
} from "@/src/services/mockExamApi";

import { SelectRow } from "./SelectRow";
import { TagChip } from "./TagChip";
import { GradeModal } from "./GradeModal";
import { SkillModal } from "./SkillModal";

import {
  DifficultyLevel,
  MockExamConfig,
  QuestionType,
  SubjectArea,
} from "../types/mock-exam";

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

  const [stages, setStages] = useState<
    Stage[]
  >([]);

  const [
    descriptors,
    setDescriptors,
  ] = useState<Descriptor[]>([]);

  const [
    stagesLoading,
    setStagesLoading,
  ] = useState(false);

  const [
    descriptorsLoading,
    setDescriptorsLoading,
  ] = useState(false);

  const [
    stagesError,
    setStagesError,
  ] = useState("");

  const [
    descriptorsError,
    setDescriptorsError,
  ] = useState("");

  const [
    validationError,
    setValidationError,
  ] = useState("");

  const quantityOptions = [10, 15, 20];

  const difficultyOptions: {
    label: string;
    value: DifficultyLevel;
    customBorder?: string;
  }[] = [
    {
      label: "Fácil",
      value: "easy",
    },
    {
      label: "Médio",
      value: "medium",
    },
    {
      label: "Difícil",
      value: "hard",
      customBorder: "#EF4444",
    },
  ];

  const questionTypeOptions: {
    id: QuestionType;
    label: string;
  }[] = [
    {
      id: "previous",
      label: "Questões de provas anteriores",
    },
    {
      id: "new",
      label: "Questões inéditas",
    },
    {
      id: "combined",
      label:
        "Combinação de anteriores e novas",
    },
  ];

  /**
   * O frontend utiliza:
   *
   * mathematics
   * portuguese
   *
   * enquanto o backend utiliza:
   *
   * MATHEMATICS
   * PORTUGUESE
   */
  const getDisciplineCode = (
    area: SubjectArea
  ) => {
    if (area === "mathematics") {
      return "MATHEMATICS";
    }

    if (area === "portuguese") {
      return "PORTUGUESE";
    }

    return null;
  };

  const disciplineCode =
    getDisciplineCode(config.area);

  /**
   * Carrega as séries sempre que
   * a disciplina mudar.
   */
  useEffect(() => {
    async function loadStages() {
      if (!disciplineCode) {
        setStages([]);
        return;
      }

      try {
        setStagesLoading(true);
        setStagesError("");

        const data = await getStages(
          disciplineCode
        );

        setStages(data);
      } catch (error) {
        console.error(error);

        setStages([]);

        setStagesError(
          "Não foi possível carregar as séries."
        );
      } finally {
        setStagesLoading(false);
      }
    }

    loadStages();
  }, [disciplineCode]);

  /**
   * Carrega os descritores quando
   * disciplina + série estiverem definidos.
   */
  useEffect(() => {
    async function loadDescriptors() {
      if (
        !disciplineCode ||
        !config.grade
      ) {
        setDescriptors([]);
        return;
      }

      try {
        setDescriptorsLoading(true);
        setDescriptorsError("");

        const data = await getDescriptors(
          disciplineCode,
          config.grade
        );

        setDescriptors(data);
      } catch (error) {
        console.error(error);

        setDescriptors([]);

        setDescriptorsError(
          "Não foi possível carregar os descritores."
        );
      } finally {
        setDescriptorsLoading(false);
      }
    }

    loadDescriptors();
  }, [
    disciplineCode,
    config.grade,
  ]);

  const getAreaLabel = () => {
    if (
      config.area === "portuguese"
    ) {
      return "Português";
    }

    if (
      config.area === "mathematics"
    ) {
      return "Matemática";
    }

    return "Selecione uma área";
  };

  /**
   * config.grade guarda o código,
   * como 5EF.
   *
   * Aqui procuramos o nome para
   * mostrar na tela.
   */
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

    setIsGradeModalOpen(false);

    setValidationError("");
  };

  const handleOpenSkillModal = () => {
    if (!config.grade) {
      setValidationError(
        "Selecione o ano/série antes de escolher os descritores."
      );

      return;
    }

    setValidationError("");

    setIsSkillModalOpen(true);
  };

  /**
   * skill agora é o ID do descritor.
   */
  const handleToggleSkill = (
    descriptorId: string
  ) => {
    const exists =
      config.skills.includes(
        descriptorId
      );

    const updatedSkills = exists
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
      skills: config.skills.filter(
        (id) =>
          id !== descriptorId
      ),
    });
  };

  /**
   * Encontra os objetos completos
   * correspondentes aos IDs selecionados.
   */
  const selectedDescriptors =
    descriptors.filter(
      (descriptor) =>
        config.skills.includes(
          descriptor.id
        )
    );

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

        {/* Área */}
        <SelectRow
          label="Área"
          value={getAreaLabel()}
          icon={BookOpen}
          onPress={onChangeArea}
          scale={scale}
        />

        {/* Série */}
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

        {/* Quantidade */}
        <View
          style={[
            styles.sectionCard,
            {
              padding: 14 * scale,
            },
          ]}
        >
          <View
            style={
              styles.sectionHeader
            }
          >
            <FileText
              size={20 * scale}
              color="#286D9B"
            />

            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize:
                    14 * scale,
                },
              ]}
            >
              Quantidade de questões
            </Text>
          </View>

          <View
            style={styles.rowPills}
          >
            {quantityOptions.map(
              (qty) => {
                const isSelected =
                  config.questionCount ===
                  qty;

                return (
                  <TouchableOpacity
                    key={qty}
                    onPress={() =>
                      onChangeConfig({
                        questionCount:
                          qty,
                      })
                    }
                    style={[
                      styles.pill,

                      isSelected &&
                        styles.pillSelected,

                      {
                        paddingVertical:
                          8 * scale,

                        borderRadius:
                          20 * scale,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,

                        isSelected &&
                          styles.pillTextSelected,

                        {
                          fontSize:
                            14 * scale,
                        },
                      ]}
                    >
                      {qty}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>

        {/* Dificuldade */}
        <View
          style={[
            styles.sectionCard,
            {
              padding: 14 * scale,
            },
          ]}
        >
          <View
            style={
              styles.sectionHeader
            }
          >
            <Gauge
              size={20 * scale}
              color="#286D9B"
            />

            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize:
                    14 * scale,
                },
              ]}
            >
              Dificuldade do simulado
            </Text>
          </View>

          <View
            style={styles.rowPills}
          >
            {difficultyOptions.map(
              (item) => {
                const isSelected =
                  config.difficulty ===
                  item.value;

                return (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() =>
                      onChangeConfig({
                        difficulty:
                          item.value,
                      })
                    }
                    style={[
                      styles.pill,

                      item.customBorder &&
                        !isSelected && {
                          borderColor:
                            item.customBorder,
                        },

                      isSelected &&
                        styles.pillSelected,

                      {
                        paddingVertical:
                          8 * scale,

                        borderRadius:
                          20 * scale,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,

                        item.customBorder &&
                          !isSelected && {
                            color:
                              item.customBorder,
                          },

                        isSelected &&
                          styles.pillTextSelected,

                        {
                          fontSize:
                            14 * scale,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>

        {/* Descritores */}
        <View
          style={[
            styles.sectionCard,
            {
              padding: 14 * scale,
            },
          ]}
        >
          <View
            style={
              styles.sectionHeaderBetween
            }
          >
            <View
              style={
                styles.sectionHeader
              }
            >
              <Target
                size={20 * scale}
                color="#286D9B"
              />

              <Text
                style={[
                  styles.sectionTitle,
                  {
                    fontSize:
                      14 * scale,
                  },
                ]}
              >
                Habilidades (Descritores)
              </Text>
            </View>

            <TouchableOpacity
              onPress={
                handleOpenSkillModal
              }
              style={
                styles.addButton
              }
            >
              <Plus
                size={16 * scale}
                color="#286D9B"
              />

              <Text
                style={[
                  styles.addButtonText,
                  {
                    fontSize:
                      13 * scale,
                  },
                ]}
              >
                Selecionar
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={
              styles.tagWrapper
            }
          >
            {selectedDescriptors.length ===
            0 ? (
              <Text
                style={[
                  styles.emptySkillsText,
                  {
                    fontSize:
                      13 * scale,
                  },
                ]}
              >
                Nenhum descritor selecionado.
                Clique em Selecionar.
              </Text>
            ) : (
              selectedDescriptors.map(
                (descriptor) => (
                  <TagChip
                    key={
                      descriptor.id
                    }
                    label={
                      descriptor.code
                    }
                    onRemove={() =>
                      handleRemoveSkill(
                        descriptor.id
                      )
                    }
                    scale={scale}
                  />
                )
              )
            )}
          </View>
        </View>

        {/* Tipo */}
        <View
          style={[
            styles.sectionCard,
            {
              padding: 14 * scale,
            },
          ]}
        >
          <View
            style={
              styles.sectionHeader
            }
          >
            <Files
              size={20 * scale}
              color="#286D9B"
            />

            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize:
                    14 * scale,
                },
              ]}
            >
              Tipo de questões
            </Text>
          </View>

          <View
            style={
              styles.rowCards
            }
          >
            {questionTypeOptions.map(
              (item) => {
                const isSelected =
                  config.questionType ===
                  item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      onChangeConfig({
                        questionType:
                          item.id,
                      })
                    }
                    style={[
                      styles.typeBox,

                      isSelected &&
                        styles.typeBoxSelected,

                      {
                        padding:
                          10 * scale,

                        borderRadius:
                          12 * scale,
                      },
                    ]}
                  >
                    {isSelected && (
                      <CheckCircle2
                        size={
                          16 * scale
                        }
                        color="#286D9B"
                        style={
                          styles.checkIcon
                        }
                      />
                    )}

                    <Text
                      style={[
                        styles.typeBoxText,

                        isSelected &&
                          styles.typeBoxTextSelected,

                        {
                          fontSize:
                            11 * scale,
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>

        {validationError !== "" && (
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
          style={{
            marginTop:
              12 * scale,

            marginBottom:
              24 * scale,
          }}
        >
          <PrimaryButton
            title="✨ Gerar simulado"
            onPress={handleGenerate}
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
        loading={stagesLoading}
        error={stagesError}
        onSelect={
          handleSelectGrade
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

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  sectionHeaderBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontWeight: "600",
    color: "#090B2B",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  addButtonText: {
    color: "#286D9B",
    fontWeight: "600",
  },

  emptySkillsText: {
    color: "#94A3B8",
    fontStyle: "italic",
    paddingVertical: 4,
  },

  validationError: {
    color: "#DC2626",
    fontWeight: "500",
    marginTop: 2,
  },

  rowPills: {
    flexDirection: "row",
    gap: 8,
  },

  pill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },

  pillSelected: {
    backgroundColor: "#286D9B",
    borderColor: "#286D9B",
  },

  pillText: {
    fontWeight: "600",
    color: "#64748B",
  },

  pillTextSelected: {
    color: "#FFFFFF",
  },

  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  rowCards: {
    flexDirection: "row",
    gap: 8,
  },

  typeBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    minHeight: 70,
  },

  typeBoxSelected: {
    borderColor: "#286D9B",
    backgroundColor: "#E0F2FE",
  },

  checkIcon: {
    marginBottom: 4,
  },

  typeBoxText: {
    textAlign: "center",
    color: "#64748B",
    lineHeight: 14,
  },

  typeBoxTextSelected: {
    color: "#286D9B",
    fontWeight: "700",
  },
});