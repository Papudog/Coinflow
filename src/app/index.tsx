import { Router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { theme } from "@/src/constants/theme";
import Logo from "@/src/components/svgs/logo";
import CustomInput from "@/src/components/ui/custom_input";
import useEmail from "@/src/hooks/useEmail";
import usePassword from "@/src/hooks/usePassword";
import ButtonSubmit from "@/src/components/ui/button_submit";
import { supabase } from "@/lib/supabase";

export default function Login(): React.JSX.Element {
  const router: Router = useRouter();

  const [email, setEmail, isEmailValid] = useEmail();
  const [password, setPassword, isPasswordValid] = usePassword();

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect((): void => {
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  const onSubmit = (): void => {
    if (isFormValid) signInWithEmail();
  };

  const signInWithEmail = async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else router.push({ pathname: "/dashboard" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <Logo />

        <CustomInput
          value={email}
          setValue={setEmail}
          animationDelay={200}
          placeholder="Email"
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          animationDelay={400}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={styles.loginOptions}
        >
          <TouchableOpacity>
            <Text style={styles.text_tertiary}>Forgot password?</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={{ width: "100%" }}
        >
          <ButtonSubmit
            onPress={(): void => onSubmit()}
            disabled={!isFormValid}
          >
            <Text style={styles.text_light}>Log in</Text>
            <FontAwesome name="arrow-right" size={16} color={theme.light} />
          </ButtonSubmit>
        </Animated.View>

        <Animated.View
          entering={FadeInLeft.delay(800).duration(1000).springify()}
          style={styles.divider}
        >
          <View style={styles.lines} />
          <View>
            <Text
              style={{
                ...styles.text_tertiary,
                width: 50,
                textAlign: "center",
              }}
            >
              Or
            </Text>
          </View>
          <View style={styles.lines} />
        </Animated.View>

        <Animated.View
          entering={FadeInLeft.delay(800).duration(1000).springify()}
          style={styles.loginMethods}
        >
          <TouchableOpacity>
            <FontAwesome name="google" size={16} color={theme.tertiary} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInLeft.delay(1000).duration(1000).springify()}
          style={{
            position: "absolute",
            bottom: 60,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.text_light}>Don't have an account? </Text>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => router.push({ pathname: "/signup" })}
          >
            <Text style={styles.text_tertiary}>Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: theme.primary,
    width: "100%",
    marginTop: 20,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  },
  loginOptions: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "flex-end",
  },
  loginMethods: {
    flexDirection: "row",
    borderColor: theme.tertiary,
    borderWidth: 2,
    padding: 12,
    borderRadius: 50,
  },
  lines: { flex: 1, height: 1, backgroundColor: theme.tertiary },
  touchableButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  text_light: {
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
