"use client";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCategory } from "@/services/category/category.api";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: async () => {
      toast.success("Category created successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["admin-categories"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Failed to create category."
        );
      } else {
        toast.error("Something went wrong.");
      }
    },
  });
};