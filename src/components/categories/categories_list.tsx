import { theme } from "@/src/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import CategoriesSheet from "./categories_sheet";
import { supabase } from "@/lib/supabase";
import { Category } from "../../models/categories";
import { CATEGORIES } from "../../constants/supabase";
import { useSheet } from "@/src/context/sheet_context";
import { useCategory } from "@/src/context/category_context";

export default function CategoriesList(): React.JSX.Element {
  const { openBottomSheet } = useSheet();
  const { status, setCategories } = useCategory();
  const [data, setData] = useState<Category[]>([]);

  useEffect((): void => {
    getCategories()
      .then((resolve): void => {
        setData(resolve);
        setCategories(resolve);
      })
      .catch(console.error);
  }, [status]);

  const renderItem: ListRenderItem<Category> = ({
    item,
  }): React.JSX.Element => {
    return (
      <TouchableOpacity
        style={{
          ...styles.buttonFilter,
          borderColor: item.color,
          marginHorizontal: 3,
        }}
      >
        <View>
          <Text style={{ ...styles.text, color: item.color, fontSize: 14 }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      entering={FadeInLeft.delay(600).duration(600).springify()}
      style={{ marginBottom: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ ...styles.text_tertiary, fontSize: 24 }}>
            Categories
          </Text>
        </View>
        <TouchableOpacity
          style={{
            ...styles.buttonFilter,
            borderWidth: 0,
            backgroundColor: "transparent",
          }}
          onPress={(): void => openBottomSheet(<CategoriesSheet />)}
        >
          <FontAwesome name="plus" size={16} color={theme.secondary} />
          <Text
            style={{ ...styles.text, fontSize: 14, color: theme.secondary }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(data: Category) => data && data.id.toString()}
        horizontal={true}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
}

function getCategories(): Promise<Category[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.from(CATEGORIES).select("*");
      if (error) throw error;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

const styles = StyleSheet.create({
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
});
