import { theme } from "@/src/constants/theme";
import { useCategory } from "@/src/context/category_context";
import { Category } from "@/src/models/categories";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import {
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface CategoriesModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function CategoriesModal({
  isVisible,
  setIsVisible,
}: CategoriesModalProps): React.JSX.Element {
  const { categories, category, setCategory } = useCategory();
  const [data, setData] = useState<Category[]>([]);

  // Categories fetched from the context
  useEffect((): void => {
    setData(categories);
  }, [categories]);

  const renderItem: ListRenderItem<Category> = ({
    item,
  }): React.JSX.Element => {
    const isSelected: boolean = category?.id === item.id;

    return (
      <View style={{ flex: 1 }}>
        <Pressable
          style={{
            backgroundColor: theme.high_medium,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginVertical: 5,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
          onPress={(): void => {
            setCategory(item);
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ ...styles.text, color: item.color, fontSize: 16 }}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: isSelected ? theme.primary : theme.medium,
                padding: 8,
                borderWidth: isSelected ? 2 : 2,
                borderColor: isSelected ? theme.medium : theme.dark,
                borderRadius: 10,
              }}
              onPress={(): void => {
                setCategory(item);
              }}
            ></TouchableOpacity>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <Text
              style={{
                ...styles.text,
                fontSize: 28,
                marginBottom: 15,
              }}
            >
              Choose a category
            </Text>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={false}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.buttonModal}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...styles.text }}>Select</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.text_tertiary}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 150,
    marginHorizontal: 30,
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: theme.medium,
  },
  buttonModal: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: theme.primary,
    marginVertical: 20,
    padding: 10,
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
