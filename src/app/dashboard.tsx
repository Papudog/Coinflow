import LatestTransactions from "@/src/components/latest_transactions";
import PieGraph from "@/src/components/pie_chart";
import UserCategories from "@/src/components/user_categories";
import { theme } from "@/src/constants/theme";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { useUser } from "../providers/user_provider";
import { supabase } from "@/lib/supabase";
import SheetProvider from "../providers/sheet_provider";
import CategoryProvider from "../providers/category_provider";

export default function Dashboard(): React.JSX.Element {
  const { setUuid } = useUser();

  useEffect((): void => {
    const getUserAuth = async (): Promise<void> => {
      const { data } = await supabase.auth.getUser();
      if (data) setUuid(data.user!.id);
    };
    getUserAuth();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerWrapper}>
        <Animated.View
          entering={FadeInLeft.delay(400).duration(400).springify()}
          style={styles.header}
        >
          <Image
            source={require("../assets/images/bud_logo.png")}
            style={{ width: 40, height: 32 }}
          />
          <Text
            style={{
              ...styles.text,
              fontFamily: "Outfit-Bold",
              fontSize: 32,
            }}
          >
            Coinflow
          </Text>
        </Animated.View>

        <View>
          <UserCategories />
          <PieGraph />
          <LatestTransactions />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark,
  },
  containerWrapper: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },

  buttonFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(131, 208, 255, 0.1)",
    borderColor: theme.secondary,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
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
