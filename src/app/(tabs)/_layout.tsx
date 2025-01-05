import TabBar from "@/src/components/tab_bar";
import { theme } from "@/src/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout(): React.JSX.Element {
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => TabBar({ ...props })}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="add_transaction"
        options={{
          title: "Transaction",
        }}
      />
      <Tabs.Screen
        name="user_page"
        options={{
          title: "User",
        }}
      />
    </Tabs>
  );
}
