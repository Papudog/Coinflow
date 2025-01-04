import BottomSheet from "@gorhom/bottom-sheet";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import Sheet from "../components/ui/sheet";

interface SheetProps {
  openBottomSheet: (node: ReactNode) => void;
  closeBottomSheet: () => void;
}

const SheetContext = createContext<SheetProps>({} as SheetProps);

export default function SheetProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const sheetRef = useRef<BottomSheet>(null);

  const [node, setNode] = useState<ReactNode | null>(null);

  const openBottomSheet = (node: ReactNode): void => {
    setNode(node);
    console.log("opening");
    sheetRef.current?.snapToIndex(0);
  };

  const closeBottomSheet = (): void => {
    sheetRef.current?.close();
    console.log("closing");
    setNode(null);
  };

  return (
    <SheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}

      {node && <Sheet ref={sheetRef}>{node}</Sheet>}
    </SheetContext.Provider>
  );
}

export const useSheet = (): SheetProps => useContext(SheetContext);
