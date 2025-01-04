import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode } from "react";

interface SheetProps {
  children: ReactNode;
}

const sheet = forwardRef<BottomSheet, SheetProps>(
  ({ children }, ref): React.JSX.Element => {
    const snapPoints: string[] = ["40%", "60%"];

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    );
  }
);

export default sheet;
