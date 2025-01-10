import { theme } from "@/src/constants/theme";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/src/providers/user_provider";
import TransactionList from "@/src/components/transactions/transaction_list";
import TransactionSwitch from "@/src/components/transactions/ui/transaction_switch";
import CategoriesList from "@/src/components/categories/categories_list";
import TransactionSection from "@/src/components/transactions/transaction_section";

export default function Dashboard(): React.JSX.Element {
  const { setUuid } = useUser();
  const [type, setType] = useState<string>("Expense");

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
            source={require("../../assets/images/bud_logo.png")}
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
          <CategoriesList />
          <TransactionSection />
          <View style={{ marginVertical: 20 }}>
            <TransactionSwitch />
          </View>
          <TransactionList />
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
