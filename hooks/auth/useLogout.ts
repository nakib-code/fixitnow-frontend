"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { logoutUser } from "@/services/auth/auth.api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      toast.success("Logout successful");

      // user cache clear
      queryClient.removeQueries({
        queryKey: ["current-user"],
      });

      // সব booking/payment cache clear করতে পারো
      queryClient.clear();
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "Logout failed"
      );
    },
  });
};