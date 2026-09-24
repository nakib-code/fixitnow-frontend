"use client";

import { useQuery } from "@tanstack/react-query";

import { ICategory } from "@/types/category";
import { getCategories } from "@/services/category/category.api";

export const useAdminCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["admin-categories"],
    queryFn: getCategories,
  });
};