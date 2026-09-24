"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { loginUser } from "@/services/auth/auth.api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      const user = data?.data?.user;

      if (user) {
        queryClient.setQueryData(["current-user"], user);
      }

      toast.success("Login successful");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    },
  });
};