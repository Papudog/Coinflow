import { createContext, useContext } from "react";
import { Category } from "../models/categories";

interface CategoryContextProps {
  name: string;
  color: string;
  isInputNotDisabled: boolean;
  status: number;
  categories: Category[];
  category: Category;
  setName: (name: string) => void;
  setColor: (color: string) => void;
  setStatus: (status: number) => void;
  setCategories: (categories: Category[]) => void;
  setCategory: (category: Category) => void;
}

export const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export const useCategory = (): CategoryContextProps =>
  useContext(CategoryContext);
