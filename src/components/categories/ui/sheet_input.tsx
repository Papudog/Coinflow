import { theme } from "@/src/constants/theme";
import { useCategory } from "@/src/context/category_context";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface SheetInputProps {
  placeholder: string;
}

export default function SheetInput({
  placeholder,
}: SheetInputProps): React.JSX.Element {
  const { name, setName, isInputNotDisabled } = useCategory();

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.inputContainer}>
        <View
          style={
            !isInputNotDisabled
              ? styles.iconContainer
              : { ...styles.iconContainer, backgroundColor: theme.secondary }
          }
        >
          <FontAwesome
            name="pencil"
            size={16}
            color={!isInputNotDisabled ? theme.high_medium : theme.dark}
          />
        </View>
        <TextInput
          placeholder={placeholder}
          value={name}
          onChangeText={(text): void => setName(text)}
          style={{ paddingHorizontal: 10, color: theme.dark, width: "85%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: theme.dark,
    borderRadius: 10,
    height: 40,
  },
  iconContainer: {
    height: "100%",
    width: "15%",
    backgroundColor: theme.dark,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
