import { useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as yup from "yup";
import { Formik, FormikProps } from "formik";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { theme } from "@/constants/theme";
import Logo from "@/shared/components/svgs/logo";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigation = useNavigation();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, (min): string => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  useEffect((): void => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>

      <View style={styles.content_wrapper}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={styles.viewContainer}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={theme.light}
            style={styles.input}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(2000).springify()}
          style={styles.viewContainer}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.light}
            secureTextEntry
          />
        </Animated.View>

        <View
          style={{ width: "100%", alignItems: "flex-end", marginVertical: 10 }}
        >
          <TouchableOpacity>
            <Text style={{ color: theme.tertiary, fontSize: 12 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.light }}>Log in</Text>
            <FontAwesome name="arrow-right" size={16} color={theme.light} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: theme.tertiary }} />
        <View>
          <Text
            style={{ width: 50, textAlign: "center", color: theme.tertiary }}
          >
            Or
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.tertiary }} />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          borderColor: theme.tertiary,
          borderWidth: 2,
          padding: 12,
          borderRadius: 50,
        }}
      >
        <TouchableOpacity>
          <FontAwesome name="google" size={16} color={theme.tertiary} />
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", bottom: 60, flexDirection: "row" }}>
        <Text style={{ color: theme.light, fontSize: 12 }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text style={{ color: theme.tertiary, fontSize: 12 }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.dark,
  },
  content_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 40,
  },

  brandName: {
    fontSize: 36,
    fontWeight: "bold",
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: theme.primary,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.primary,
    width: "100%",
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: "100%",
    color: theme.primary,
  },

  blobBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  blobTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
