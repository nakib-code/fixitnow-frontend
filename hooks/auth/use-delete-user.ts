"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteUser } from "@/services/admin/admin.api";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete user"
      );
    },
  });
};