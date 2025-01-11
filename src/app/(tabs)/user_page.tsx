import { supabase } from "@/lib/supabase";
import { theme } from "@/src/constants/theme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View } from "react-native";

export default function UserPage(): React.JSX.Element {

  const handleLogout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()

    if (error) ToastAndroid.show("Error logging out", ToastAndroid.SHORT)
    else {
      ToastAndroid.show("Logged out", ToastAndroid.SHORT)
      router.replace("/")
    }
  }


  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 50 }}>
        <TouchableOpacity style={{ padding: 10, backgroundColor: theme.primary, borderRadius: 5, width: "100%" }} onPress={() => handleLogout()}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
})