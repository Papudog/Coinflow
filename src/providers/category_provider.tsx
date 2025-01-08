import { PropsWithChildren, useEffect, useState } from "react";
import { Category } from "../models/categories";
import { CategoryContext } from "../context/category_context";

export default function CategoryProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isInputNotDisabled, setIsInputNotDisabled] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | null>(null);

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
        category,
        setCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
