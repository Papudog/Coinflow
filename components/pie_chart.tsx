import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { theme } from "@/constants/theme";
import Card from "./card";
import { PieChart } from "react-native-gifted-charts";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import Animated, {
  FadeInLeft,
  FadingTransition,
} from "react-native-reanimated";

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

  const legendComponet = (): React.JSX.Element => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 120,
            marginRight: 20,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: theme.success,
              borderRadius: 10,
              marginRight: 20,
            }}
          />
          <Text style={styles.text}>Income</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 110,
            marginRight: 20,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: theme.danger,
              borderRadius: 10,
              marginRight: 20,
            }}
          />
          <Text style={styles.text}>Expense</Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View entering={FadeInLeft.delay(400).duration(400).springify()}>
      <Card>
        <View style={styles.chartHeading}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View>
                <FontAwesome
                  name="pie-chart"
                  size={18}
                  color={theme.tertiary}
                />
              </View>
              <Text style={{ ...styles.text_tertiary, fontSize: 18 }}>
                This month
              </Text>
            </View>

            <View>
              <TouchableOpacity>
                <FontAwesome name="filter" size={18} color={theme.tertiary} />
              </TouchableOpacity>
            </View>
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
                <Text style={styles.text}>Amount</Text>
                <Text style={{ ...styles.text, fontSize: 20 }}>200$</Text>
              </View>
            )}
          />
          {legendComponet()}
        </View>
      </Card>
    </Animated.View>
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
