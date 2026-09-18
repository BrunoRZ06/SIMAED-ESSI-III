import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BookOpen,
  Calculator,
  Sparkles,
} from "lucide-react-native";

import { PrimaryButton } from "@/src/features/onboarding/components/PrimaryButton";
import { OptionCard } from "./OptionCard";
import { SubjectArea } from "../../../types/mock-exam";

import {
  Discipline,
  getDisciplines,
} from "@/src/services/mockExamApi";

interface StepAreaSelectionProps {
  selectedArea: SubjectArea;
  onSelectArea: (area: SubjectArea) => void;
  onContinue: () => void;
  scale?: number;
}

export const StepAreaSelection: React.FC<
  StepAreaSelectionProps
> = ({
  selectedArea,
  onSelectArea,
  onContinue,
  scale = 1,
}) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDisciplines = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDisciplines();

      setDisciplines(data);
    } catch (error) {
      console.error(error);

      setDisciplines([]);

      setError(
        "Não foi possível carregar as disciplinas."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDisciplines();
  }, [loadDisciplines]);

  const getAreaFromCode = (
    code: string
  ): SubjectArea => {
    if (code === "MATHEMATICS") {
      return "mathematics";
    }

    if (code === "PORTUGUESE") {
      return "portuguese";
    }

    return null;
  };

  const getDisciplinePresentation = (
    code: string
  ) => {
    if (code === "MATHEMATICS") {
      return {
        icon: Calculator,
        description:
          "Números, operações, geometria e resolução de problemas.",
      };
    }

    return {
      icon: BookOpen,
      description:
        "Leitura, interpretação, gramática e análise linguística.",
    };
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            fontSize: 26 * scale,
            lineHeight: 32 * scale,
          },
        ]}
      >
        Qual área você deseja{"\n"}
        <Text style={styles.highlight}>
          Trabalhar?
        </Text>
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            fontSize: 14 * scale,
            marginTop: 8 * scale,
            marginBottom: 24 * scale,
          },
        ]}
      >
        Escolha a disciplina para gerar questões alinhadas ao SAEPE.
      </Text>

      {loading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator />

          <Text style={styles.statusText}>
            Carregando disciplinas...
          </Text>
        </View>
      )}

      {!loading && error !== "" && (
        <View style={styles.statusContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadDisciplines}
          >
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading &&
        !error &&
        disciplines.map((discipline) => {
          const area = getAreaFromCode(
            discipline.code
          );

          if (!area) {
            return null;
          }

          const presentation =
            getDisciplinePresentation(
              discipline.code
            );

          return (
            <OptionCard
              key={discipline.id}
              title={discipline.name}
              description={
                presentation.description
              }
              icon={presentation.icon}
              isSelected={
                selectedArea === area
              }
              onSelect={() =>
                onSelectArea(area)
              }
              scale={scale}
            />
          );
        })}

      <View
        style={[
          styles.infoBanner,
          {
            padding: 12 * scale,
            borderRadius: 12 * scale,
            marginTop: "auto",
          },
        ]}
      >
        <View
          style={[
            styles.aiBadge,
            {
              width: 32 * scale,
              height: 32 * scale,
              borderRadius: 16 * scale,
            },
          ]}
        >
          <Sparkles
            size={16 * scale}
            color="#0E7490"
          />
        </View>

        <Text
          style={[
            styles.infoText,
            {
              fontSize: 13 * scale,
            },
          ]}
        >
          A IA irá gerar questões com base nas habilidades avaliadas pelo SAEPE
        </Text>
      </View>

      <View
        style={{
          marginTop: 16 * scale,
        }}
      >
        <PrimaryButton
          title="Continuar"
          onPress={() => {
            if (selectedArea) {
              onContinue();
            }
          }}
          scale={scale}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontWeight: "700",
    color: "#090B2B",
  },

  highlight: {
    color: "#286D9B",
  },

  subtitle: {
    color: "#68677F",
  },

  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    gap: 10,
  },

  statusText: {
    color: "#64748B",
    fontSize: 13,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 13,
    textAlign: "center",
  },

  retryButton: {
    borderWidth: 1,
    borderColor: "#286D9B",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  retryButtonText: {
    color: "#286D9B",
    fontWeight: "600",
    fontSize: 13,
  },

  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    gap: 10,
    marginBottom: 16,
  },

  aiBadge: {
    backgroundColor: "#BAE6FD",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    color: "#0369A1",
    fontWeight: "500",
    lineHeight: 18,
  },
});