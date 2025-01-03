import ButtonSubmit from "@/src/components/button_submit";
import CustomInput from "@/src/components/custom_input";
import { theme } from "@/src/constants/theme";
import useEmail from "@/src/hooks/useEmail";
import usePassword from "@/src/hooks/usePassword";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function SignUp(): React.JSX.Element {
  const [email, setEmail, isEmailValid] = useEmail();
  const [password, setPassword, isPasswordValid] = usePassword();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");

  useEffect((): void => {
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const onSubmit = (): void => {
    if (password === passConfirm && isFormValid) {
      signUpWithEmail();
    } else Alert.alert("Passwords do not match");
  };

  const signUpWithEmail = async (): Promise<void> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) Alert.alert(error.message);
    if (!session) {
      Alert.alert("Please check your inbox for email verification!");
      router.push({ pathname: "/" });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <View>
          <Text style={{ ...styles.text, fontSize: 24, marginVertical: 20 }}>
            Create an account
          </Text>
        </View>
        <CustomInput
          value={email}
          setValue={setEmail}
          animationDelay={200}
          placeholder="Email"
        />
        <CustomInput
          value={username}
          setValue={setUsername}
          animationDelay={400}
          placeholder="Username"
        />

        <CustomInput
          value={password}
          setValue={setPassword}
          animationDelay={600}
          placeholder="Password"
          secureTextEntry={true}
        />

        <CustomInput
          value={passConfirm}
          setValue={setPassConfirm}
          animationDelay={800}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />

        <Animated.View
          entering={FadeInDown.delay(1000).duration(800).springify()}
          style={{ width: "100%" }}
        >
          <ButtonSubmit disabled={!isFormValid} onPress={() => onSubmit()}>
            <Text style={styles.text}>Sign Up</Text>
            <FontAwesome name="arrow-right" size={16} color={theme.light} />
          </ButtonSubmit>
        </Animated.View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
            gap: 5,
          }}
        >
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity
            onPress={(): void => {
              router.push({ pathname: "/" });
            }}
          >
            <Text style={styles.text_tertiary}>Go back</Text>
          </TouchableOpacity>
        </View>
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
  containerWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
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
