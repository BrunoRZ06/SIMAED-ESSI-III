import { CreateMockExamScreen } from "@/src/features/mock-exam/screens/CreateMockExamScreen";
import { Stack } from "expo-router";
import React from "react";

export default function CreateMockExamRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <CreateMockExamScreen />
    </>
  );
}
