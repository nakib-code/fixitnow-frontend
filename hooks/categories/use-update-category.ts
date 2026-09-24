"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCategory } from "@/services/category/category.api";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onSuccess: () => {
      toast.success("Category updated successfully");

      // Admin category list refresh
      queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      // Customer category list থাকলে refresh
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update category"
      );
    },
  });
};