// hooks/useResponsiveScale.ts
import { useWindowDimensions } from "react-native";

const TABLET_BREAKPOINT = 768;
const MAX_SCALE = 1.4;

export function useResponsiveScale() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  const scale = isTablet
    ? Math.min(Math.min(width / 768, height / 1024), MAX_SCALE)
    : 1;

  return { width, height, isTablet, scale };
}