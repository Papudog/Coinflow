import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { router, Slot, Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppProviders from "../providers/app_providers";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
  const [loaded, error] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect((): void => {
    if (loaded || error) {
      SplashScreen.hideAsync();

      const getUserSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        session ? router.replace("/(tabs)/dashboard") : router.replace("/");
      }

      getUserSession();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView>
      <AppProviders>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: "Login" }} />
          <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppProviders>
    </GestureHandlerRootView>
  );
}
