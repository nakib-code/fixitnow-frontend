"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { registerUser } from "@/services/auth/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      toast.success("Registration successful");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Registration failed"
      );
    },
  });
};