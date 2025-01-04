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
  status: number;
  categories: Category[];
  setName: (name: string) => void;
  setColor: (color: string) => void;
  setStatus: (status: number) => void;
  setCategories: (categories: Category[]) => void;
}

const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export default function CategoryProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const [categories, setCategories] = useState<Category[]>([]);

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
        status,
        setStatus,
        categories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = (): CategoryContextProps =>
  useContext(CategoryContext);
