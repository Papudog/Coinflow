import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../constants/theme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

interface IconProps {
  color: string;
}

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icons: { [key: string]: (props: IconProps) => React.JSX.Element } = {
    dashboard: (props) => <FontAwesome name="dashboard" size={24} {...props} />,
    add_transaction: (props) => (
      <FontAwesome name="plus" size={24} {...props} />
    ),
    user_page: (props) => <FontAwesome name="user" size={24} {...props} />,
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              ...styles.tabItem,
              backgroundColor: isFocused ? theme.primary : theme.medium,
            }}
          >
            {icons[route.name]({
              color: isFocused ? theme.dark : theme.high_medium,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.medium,
    marginHorizontal: 120,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: theme.high_medium,
    borderWidth: 2,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    padding: 8,
  },
});
