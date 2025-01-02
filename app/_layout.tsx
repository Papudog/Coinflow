import { theme } from "@/constants/theme";
import { Stack, useRouter } from "expo-router";
import React from "react";

export default function RootLayout(): React.JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
