import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { router, Slot, Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppProviders from "../providers/app_providers";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
  const [fontsLoaded] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const [isSessionChecked, setIsSessionChecked] = useState<boolean>(false);

  const onInit = useCallback(async () => {
    try {
      if (!fontsLoaded) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      session ? router.replace("/(tabs)/dashboard") : router.replace("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSessionChecked(true);
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect((): void => {
    onInit();
  }, [onInit]);

  if (!fontsLoaded || !isSessionChecked) {
    return (
      <GestureHandlerRootView>
        <AppProviders>
          <Slot />
        </AppProviders>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView>
      <AppProviders>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ title: "Login" }} />
          <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppProviders>
    </GestureHandlerRootView>
  );
}
