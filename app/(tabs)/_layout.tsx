import { theme } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.medium,
          borderColor: theme.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: (): React.JSX.Element => (
            <FontAwesome name="dashboard" size={24} color={theme.primary} />
          ),
        }}
      />
    </Tabs>
  );
}
