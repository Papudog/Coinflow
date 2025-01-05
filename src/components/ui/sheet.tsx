import { theme } from "@/src/constants/theme";
import { useSheet } from "@/src/context/sheet_context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode } from "react";
import { StyleSheet } from "react-native";

interface SheetProps {
  children: ReactNode;
}

const sheet = forwardRef<BottomSheet, SheetProps>(
  ({ children }, ref): React.JSX.Element => {
    const { closeBottomSheet } = useSheet();
    const snapPoints: string[] = ["40%", "50%"];

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        onClose={(): void => closeBottomSheet()}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: theme.high_medium,
  },
});

export default sheet;
