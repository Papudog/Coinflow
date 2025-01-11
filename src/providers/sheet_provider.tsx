import BottomSheet from "@gorhom/bottom-sheet";
import {
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
} from "react";
import Sheet from "../components/ui/sheet";
import SheetContext from "../context/sheet_context";

export default function SheetProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const sheetRef = useRef<BottomSheet>(null);
  const [node, setNode] = useState<ReactNode | null>(null);

  const openBottomSheet = (node: ReactNode): void => {
    setNode(node);
    sheetRef.current?.snapToIndex(0);
  };

  const closeBottomSheet = (): void => {
    setNode(null);
    sheetRef.current?.close();
  };

  return (
    <SheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      {node && <Sheet ref={sheetRef}>{node}</Sheet>}
    </SheetContext.Provider>
  );
}
