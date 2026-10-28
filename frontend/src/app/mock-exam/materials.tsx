import React from "react";
import { Stack } from "expo-router";

import { MaterialsScreen } from "@/src/features/mock-exam/screens/MaterialsScreen";

export default function MaterialsRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} />
      <MaterialsScreen />
    </>
  );
}
