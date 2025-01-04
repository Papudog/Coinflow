import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Category } from "../models/categories";

interface CategoryContextProps {
  name: string;
  color: string;
  isInputNotDisabled: boolean;
  setName: (name: string) => void;
  setColor: (color: string) => void;
}

const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export default function CategoryProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const [isInputNotDisabled, setIsInputNotDisabled] = useState<boolean>(false);

  useEffect((): void => {
    const isNotDisabled: boolean = color !== "" && name !== ""; // True
    setIsInputNotDisabled(isNotDisabled);
  }, [color, name]);

  return (
    <CategoryContext.Provider
      value={{
        name,
        color,
        isInputNotDisabled,
        setName,
        setColor,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = (): CategoryContextProps =>
  useContext(CategoryContext);
