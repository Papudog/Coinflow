import BottomSheet from "@gorhom/bottom-sheet";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Sheet from "../components/ui/sheet/sheet";

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

export const useSheet = (): SheetProps => useContext(SheetContext);
