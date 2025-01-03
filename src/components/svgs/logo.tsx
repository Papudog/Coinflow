import React from "react";
import { View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Svg, Rect, G } from "react-native-svg";

const Logo = () => {
  return (
    <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()}>
      <Svg viewBox="0 0 38.429714 29.590555" width={150} height={150}>
        <G transform="translate(-23.730631,-58.900002)">
          <Rect
            x="42.554951"
            y="68.885162"
            width="19.178488"
            height="19.178488"
            fill="#1e91ff"
            stroke="#1e91ff"
            strokeWidth="0.853813"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="none"
            fillOpacity="1"
            strokeOpacity="1"
          />
          <Rect
            x="30.448738"
            y="59.399998"
            width="22.462185"
            height="22.462185"
            fill="#0054e9"
            stroke="#0054e9"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="none"
            fillOpacity="1"
            strokeOpacity="1"
          />
          <Rect
            x="24.028328"
            y="71.206032"
            width="13.373888"
            height="13.373888"
            fill="#83d0ff"
            stroke="#83d0ff"
            strokeWidth="0.595396"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="none"
            fillOpacity="1"
            strokeOpacity="1"
          />
        </G>
      </Svg>
    </Animated.View>
  );
};

export default Logo;
