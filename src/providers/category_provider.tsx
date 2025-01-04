import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface CategoryContextProps {
  name: string;
  color: string;
  isInputNotDisabled: boolean;
  status: number;
  setName: (name: string) => void;
  setColor: (color: string) => void;
  setStatus: (status: number) => void;
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
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = (): CategoryContextProps =>
  useContext(CategoryContext);
