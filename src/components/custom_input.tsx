import { theme } from "@/src/constants/theme";
import { ColorValue, StyleSheet, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface CustomInputProps {
  value: string;
  setValue: (value: string) => void;
  animationDelay: number;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function CustomInput({
  value,
  setValue,
  animationDelay,
  placeholder,
  secureTextEntry = false,
}: CustomInputProps): React.JSX.Element {
  return (
    <Animated.View
      entering={FadeInDown.delay(animationDelay).duration(1000).springify()}
      style={styles.inputContainer}
    >
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor={theme.light}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: theme.primary,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
