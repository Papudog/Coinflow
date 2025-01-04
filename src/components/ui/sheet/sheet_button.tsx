import { supabase } from "@/lib/supabase";
import { CATEGORIES } from "@/src/constants/supabase";
import { theme } from "@/src/constants/theme";
import { Category } from "@/src/models/categories";
import { useCategory } from "@/src/providers/category_provider";
import { useSheet } from "@/src/providers/sheet_provider";
import { useUser } from "@/src/providers/user_provider";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SheetButton(): React.JSX.Element {
  const { color, name, isInputNotDisabled } = useCategory();
  const { closeBottomSheet } = useSheet();
  const { uuid } = useUser();

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
          onSubmit(color, name, uuid, closeBottomSheet)
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
  closeBottomSheet: () => void
): Promise<void> {
  try {
    const { error } = await supabase
      .from(CATEGORIES)
      .insert({ color, name, profile_id });
    if (error) throw error;

    Alert.alert("Category saved successfully");
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
