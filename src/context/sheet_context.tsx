import { createContext, ReactNode, useContext } from "react";

interface SheetProps {
  openBottomSheet: (node: ReactNode) => void;
  closeBottomSheet: () => void;
}

const SheetContext = createContext<SheetProps | undefined>(undefined);

export const useSheet = (): SheetProps => {
  const context = useContext(SheetContext);
  if (!context) throw new Error("useSheet must be used in a SheetProvider");

  return context;
};

export default SheetContext;
