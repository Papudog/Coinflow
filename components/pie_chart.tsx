import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { theme } from "@/constants/theme";
import Card from "./card";
import { PieChart } from "react-native-gifted-charts";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function PieGraph(): React.JSX.Element {
  const pieData = [
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  return (
    <Card>
      <View style={styles.chartHeading}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FontAwesome name="pie-chart" size={20} color={theme.light} />
          <Text style={{ fontSize: 16, color: theme.light }}>This month</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={"#1A1A3F"}
          centerLabelComponent={(): React.JSX.Element => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: theme.light, fontSize: 16 }}>Amount</Text>
              <Text style={{ color: theme.light, fontSize: 20 }}>200$</Text>
            </View>
          )}
        ></PieChart>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  chartHeading: {
    borderBottomColor: theme.high_medium,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: theme.dark,
  },
  chartContainer: {
    padding: 40,
    alignItems: "center",
  },
});
