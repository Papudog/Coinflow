import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { theme } from "../constants/theme";
import SheetInput from "./ui/sheet/sheet_input";
import ColorPicker from "./ui/color_picker";
import SheetButton from "./ui/sheet/sheet_button";
import CategoryProvider from "../providers/category_provider";

export default function CategoriesSheet(): React.JSX.Element {
  return (
    <CategoryProvider>
      <View style={{ width: "100%" }}>
        <View style={styles.wrapper}>
          <Text style={{ ...styles.text, fontSize: 24, color: theme.dark }}>
            Create a category
          </Text>
          <Text style={{ ...styles.text, color: theme.dark }}>
            &#40;Using an emoji is also recommended&#41;
          </Text>
          <View style={{ gap: 10, marginVertical: 10, alignItems: "center" }}>
            <SheetInput placeholder="Name" />
            <Text style={{ ...styles.text, fontSize: 16, color: theme.dark }}>
              Pick a color
            </Text>
            <ColorPicker />
          </View>
          <SheetButton />
        </View>
      </View>
    </CategoryProvider>
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
