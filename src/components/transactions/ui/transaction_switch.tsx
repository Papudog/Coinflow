import { theme } from "@/src/constants/theme";
import { useTransaction } from "@/src/context/transaction_context";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";


export default function TransactionSwitch(): React.JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(true);
  const { setTypeSwitch, typeSwitch } = useTransaction()

  useEffect((): void => {
    setTypeSwitch(isActive ? "Expense" : "Income");
  }, [isActive]);


  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchWrapper}>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={{ ...styles.button, backgroundColor: typeSwitch === 'Expense' ? theme.primary : theme.medium }}>
          <Text style={{ ...styles.text, color: typeSwitch === 'Expense' ? theme.dark : theme.primary }}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={{ ...styles.button, backgroundColor: typeSwitch === 'Income' ? theme.primary : theme.medium, }}>
          <Text style={{ ...styles.text, color: typeSwitch === 'Income' ? theme.dark : theme.primary }}>
            Income
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: "100%",
    justifyContent: "center",
  },
  switchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.medium,
    padding: 5,
    gap: 5,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.light,
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
