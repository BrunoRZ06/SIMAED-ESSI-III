import React from "react";
import { Stack } from "expo-router";

import { MaterialPreviewScreen } from "@/src/features/mock-exam/screens/MaterialPreviewScreen";

export default function MaterialPreviewRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} />
      <MaterialPreviewScreen />
    </>
  );
}
