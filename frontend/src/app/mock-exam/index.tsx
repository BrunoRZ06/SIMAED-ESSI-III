import React from "react";
import { Redirect, Stack } from "expo-router";

export default function MockExamIndexRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Redirect href="/mock-exam/mock-exam" />
    </>
  );
}
