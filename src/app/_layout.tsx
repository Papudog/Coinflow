import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { router, Router, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): React.JSX.Element | null {
  const [loaded, error] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const [isScreenReady, setIsScreenReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (!loaded && !error) {
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) router.push("/dashboard");
        else router.push("/");
      } catch (err) {
        console.error(err);
      } finally {
        setIsScreenReady(true);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [loaded, error]);

  if (!isScreenReady) {
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
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Stack>
  );
}
