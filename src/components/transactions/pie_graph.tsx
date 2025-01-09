import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/constants/theme";
import { PieChart } from "react-native-gifted-charts";
import React from "react";

export default function PieGraph(): React.JSX.Element {
  const pieData = [
    { value: 47, color: "#009FFF", gradientCenterColor: "#006DFF", focused: true },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        radius={70}
        focusOnPress={true}
        semiCircle={true}
        innerRadius={55}
        innerCircleColor={theme.dark}
        centerLabelComponent={(): React.JSX.Element => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ ...styles.text, fontSize: 20 }}>40%</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    borderBottomColor: theme.high_medium,
    backgroundColor: theme.dark,
    flex: 1,
    marginVertical: 10,
  },
  chartWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
  text_tertiary: {
    color: theme.tertiary,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
