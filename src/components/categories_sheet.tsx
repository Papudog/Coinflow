import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { theme } from "../constants/theme";
import SheetInput from "./ui/sheet_input";
import { useEffect, useState } from "react";
import ColorPicker from "./ui/color_picker";
import SheetButton from "./ui/sheet_button";

export default function CategoriesSheet(): React.JSX.Element {
  const [categoryName, setCategoryName] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect((): void => {
    console.log(color);
  }, [color]);

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.wrapper}>
        <Text style={{ ...styles.text, fontSize: 24, color: theme.dark }}>
          Category
        </Text>
        <View style={{ gap: 10, marginVertical: 10, alignItems: "center" }}>
          <SheetInput
            placeholder="Name"
            value={categoryName}
            setValue={setCategoryName}
          />
          <Text style={{ ...styles.text, fontSize: 16, color: theme.dark }}>
            Pick a color
          </Text>
          <ColorPicker setColor={setColor} />
        </View>
        <SheetButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignContent: "center",
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
