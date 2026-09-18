import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getDescriptors,
  getStages,
} from "@/src/services/mockExamApi";

import type {
  Descriptor,
  Stage,
} from "@/src/services/mockExamApi";

import type { SubjectArea } from "../types/mock-exam";

export const useMockExamParameters = (
  area: SubjectArea,
  grade: string
) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [descriptors, setDescriptors] = useState<Descriptor[]>([]);

  const [stagesLoading, setStagesLoading] =
    useState(false);

  const [
    descriptorsLoading,
    setDescriptorsLoading,
  ] = useState(false);

  const [stagesError, setStagesError] =
    useState("");

  const [
    descriptorsError,
    setDescriptorsError,
  ] = useState("");

  const disciplineCode = useMemo(() => {
    if (area === "mathematics") {
      return "MATHEMATICS";
    }

    if (area === "portuguese") {
      return "PORTUGUESE";
    }

    return null;
  }, [area]);

  const loadStages = useCallback(async () => {
    if (!disciplineCode) {
      setStages([]);
      setStagesError("");
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
  }, [disciplineCode]);

  const loadDescriptors =
    useCallback(async () => {
      if (!disciplineCode || !grade) {
        setDescriptors([]);
        setDescriptorsError("");
        return;
      }

      try {
        setDescriptorsLoading(true);
        setDescriptorsError("");

        const data = await getDescriptors(
          disciplineCode,
          grade
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
    }, [disciplineCode, grade]);

  useEffect(() => {
    loadStages();
  }, [loadStages]);

  useEffect(() => {
    loadDescriptors();
  }, [loadDescriptors]);

  return {
    stages,
    descriptors,

    stagesLoading,
    descriptorsLoading,

    stagesError,
    descriptorsError,

    loadStages,
    loadDescriptors,
  };
};