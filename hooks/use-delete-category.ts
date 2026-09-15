"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteCategory } from "@/services/category/category.api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: async () => {
      toast.success("Category deleted successfully");

      await queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete category"
      );
    },
  });
};