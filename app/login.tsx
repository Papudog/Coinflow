import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { theme } from "@/constants/theme";
import Logo from "@/components/svgs/logo";
import CustomInput from "@/components/custom_input";

export default function Login(): React.JSX.Element {
  const navigation = useNavigation();

  useEffect((): void => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            <Text style={{ color: theme.tertiary, fontSize: 12 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.touchableButton}>
            <Text style={{ color: theme.light }}>Log in</Text>
            <FontAwesome name="arrow-right" size={16} color={theme.light} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInLeft.delay(800).duration(1000).springify()}
          style={styles.divider}
        >
          <View style={styles.lines} />
          <View>
            <Text
              style={{ width: 50, textAlign: "center", color: theme.tertiary }}
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
          style={{ position: "absolute", bottom: 60, flexDirection: "row" }}
        >
          <Text style={{ color: theme.light, fontSize: 12 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text style={{ color: theme.tertiary, fontSize: 12 }}>Sign up</Text>
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
});
