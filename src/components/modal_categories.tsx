import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ModalCategoriesProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function ModalCategories({
  modalVisible,
  setModalVisible,
}: ModalCategoriesProps): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal visible={modalVisible} animationType="slide">
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Close modal</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
