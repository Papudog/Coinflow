import { supabase } from "@/lib/supabase";
import { CATEGORIES, CATEGORY_GET_FAILED, CATEGORY_POST_FAILED } from "../constants/supabase";
import { Category } from "../models/categories";

export async function addCategory(category: Category): Promise<number> {
  const { color, name, profile_id } = category

  const { error, status } = await supabase
    .from(CATEGORIES)
    .insert({ color, name, profile_id });

  if (error) throw new Error(CATEGORY_POST_FAILED);

  return status;
};

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from(CATEGORIES)
    .select("*");

  if (error) throw new Error(CATEGORY_GET_FAILED);
  return data as Category[];
}