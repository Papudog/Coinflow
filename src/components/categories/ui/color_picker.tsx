import { theme } from "@/src/constants/theme";
import { useCategory } from "@/src/context/category_context";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface ColorButtonProps {
  color: string;
  colorHandler: (color: string) => void;
  isColorSelected: boolean;
}

export default function ColorPicker(): React.JSX.Element {
  const colors: string[] = [
    "#FFFF00", // Amarillo Neón
    "#FF6600", // Naranja Neón
    "#FF0000", // Rojo Neón
    "#FF00FF", // Rosa Neón
    "#9900FF", // Violeta Neón
    "#00FFFF", // Azul Neón
    "#00FF00", // Verde Neón
    "#39FF14", // Verde Lima Neón
    "#FF69B4", // Rosa Chicloso
    "#007FFF", // Azul Eléctrico
  ];

  const { setColor } = useCategory();
  const [selectedColor, setSelectedColor] = useState<string>("");

  const colorHandler = (color: string): void => {
    setColor(color);
    setSelectedColor(color);
  };

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <FlatList
          data={colors}
          keyExtractor={(colors) => colors}
          renderItem={({ item }) => (
            <ColorButton
              color={item}
              colorHandler={colorHandler}
              isColorSelected={item === selectedColor}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

function ColorButton({
  color,
  colorHandler,
  isColorSelected,
}: ColorButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={(): void => colorHandler(color ?? "")}
      style={{
        padding: 15,
        backgroundColor: color,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: isColorSelected ? theme.secondary : theme.medium,
        marginHorizontal: 2,
      }}
    ></TouchableOpacity>
  );
}
