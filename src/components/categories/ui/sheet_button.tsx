import { CATEGORY_POST_FAILED, CATEGORY_SUCCESS, FIELDS_REQUIRED } from "@/src/constants/supabase";
import { theme } from "@/src/constants/theme";
import { useCategory } from "@/src/context/category_context";
import { useSheet } from "@/src/context/sheet_context";
import { useUser } from "@/src/providers/user_provider";
import { addCategory } from "@/src/services/category-service";
import React from "react";
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

export default function SheetButton(): React.JSX.Element {
  // Context
  const { color, name, setName, setColor, isInputNotDisabled, setStatus } =
    useCategory();
  const { closeBottomSheet } = useSheet();
  const { uuid } = useUser();

  // Functions
  const statesHandler = (): void => {
    setName("");
    setColor("");
    setStatus(0);
  };

  const onSubmit = async (): Promise<void> => {
    try {
      if (!color || !name) {
        ToastAndroid.show(FIELDS_REQUIRED, ToastAndroid.SHORT);
        return;
      }

      const categoryStatus: number =
        await addCategory({ color, name, profile_id: uuid })

      setStatus(categoryStatus);
      statesHandler();

      ToastAndroid.show(CATEGORY_SUCCESS, ToastAndroid.SHORT);
      closeBottomSheet();
    } catch (error) {
      ToastAndroid.show(CATEGORY_POST_FAILED, ToastAndroid.SHORT);
    }
  }

  return (
    <View style={isInputNotDisabled
      ? styles.buttonContainer
      : { ...styles.buttonContainer, backgroundColor: theme.high_medium }
    }>
      <TouchableOpacity
        disabled={!isInputNotDisabled}
        onPress={(): Promise<void> => onSubmit()}
        style={styles.touchableButton}
      >
        <Text style={{ ...styles.text, color: theme.dark }}>
          {isInputNotDisabled ? "Save" : "Some fields are required"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.secondary,
    width: "100%",
    marginTop: 20,
    borderRadius: 10,
  },
  touchableButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
