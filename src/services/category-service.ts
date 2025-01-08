import { supabase } from "@/lib/supabase";
import { CATEGORIES, CATEGORY_FAILED } from "../constants/supabase";
import { Category } from "../models/categories";

export async function addCategory(category: Category): Promise<number> {
  const { color, name, profile_id } = category

  const { error, status } = await supabase
    .from(CATEGORIES)
    .insert({ color, name, profile_id });

  if (error) throw new Error(CATEGORY_FAILED);

  return status;
};