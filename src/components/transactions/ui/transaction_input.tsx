import { theme } from "@/src/constants/theme";
import { ReactNode } from "react";
import { KeyboardTypeOptions, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ExpenseInputProps {
  value: string;
  setValue?: (value: string) => void;
  placeholder: string;
  keyBoardType?: KeyboardTypeOptions;
  children?: ReactNode;
}

export default function TransactionInput(
  { value, setValue, placeholder, keyBoardType, children }: ExpenseInputProps
): React.JSX.Element {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <View style={styles.iconContainer}>
          <Text>{children}</Text>
        </View>
        <View style={{ flex: 5, justifyContent: "center", paddingLeft: 5 }}>
          <TextInput
            placeholder={placeholder}
            keyboardType={keyBoardType ?? "default"}
            value={value}
            readOnly={setValue ? false : true}
            onChangeText={(text): void => setValue && setValue(text)}
            placeholderTextColor={theme.light}
            style={styles.text}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: theme.medium,
    borderRadius: 10,
  },
  inputWrapper: {
    flexDirection: "row",
  },
  iconContainer: {
    flex: 1,
    backgroundColor: theme.medium,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
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
