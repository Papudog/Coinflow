import { supabase } from "@/lib/supabase";
import { CATEGORIES, CATEGORY_SUCCESS } from "@/src/constants/supabase";
import { theme } from "@/src/constants/theme";
import { useCategory } from "@/src/providers/category_provider";
import { useSheet } from "@/src/providers/sheet_provider";
import { useUser } from "@/src/providers/user_provider";
import React from "react";
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function SheetButton(): React.JSX.Element {
  const { color, name, setName, setColor, isInputNotDisabled, setStatus } =
    useCategory();
  const { closeBottomSheet } = useSheet();
  const { uuid } = useUser();

  const handlerStates = (): void => {
    setName("");
    setColor("");
    setStatus(0);
  };

  return (
    <View
      style={
        isInputNotDisabled
          ? styles.buttonContainer
          : { ...styles.buttonContainer, backgroundColor: theme.high_medium }
      }
    >
      <TouchableOpacity
        disabled={!isInputNotDisabled}
        onPress={(): Promise<void> =>
          onSubmit(
            color,
            name,
            uuid,
            setStatus,
            closeBottomSheet,
            handlerStates
          )
        }
        style={styles.touchableButton}
      >
        <Text style={{ ...styles.text, color: theme.dark }}>
          {isInputNotDisabled ? "Save" : "Some fields are required"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

async function onSubmit(
  color: string,
  name: string,
  profile_id: string,
  setStatus: (status: number) => void,
  closeBottomSheet: () => void,
  handlerStates: () => void
): Promise<void> {
  try {
    const { error, status } = await supabase
      .from(CATEGORIES)
      .insert({ color, name, profile_id });
    if (error) throw error;

    setStatus(status);
    handlerStates();
    ToastAndroid.show(CATEGORY_SUCCESS, ToastAndroid.SHORT);
    closeBottomSheet();
  } catch (error) {
    console.log("Error saving category: ", error);
  }
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
