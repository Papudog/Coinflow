import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
  const [loaded, error] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
    </Stack>
  );
}
