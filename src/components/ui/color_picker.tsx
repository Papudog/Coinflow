import { theme } from "@/src/constants/theme";
import { TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface ColorPickerProps {
  setColor: (color: string) => void;
  color?: string;
}

export default function ColorPicker({
  setColor,
}: ColorPickerProps): React.JSX.Element {
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
            <ColorButton color={item} setColor={setColor} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

function ColorButton({ setColor, color }: ColorPickerProps): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={(): void => setColor(color ?? "")}
      style={{
        padding: 15,
        backgroundColor: color,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: theme.medium,
        marginHorizontal: 2,
      }}
    ></TouchableOpacity>
  );
}
