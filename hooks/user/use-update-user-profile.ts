"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateUserProfile } from "@/services/user/user.api";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,

    onSuccess: () => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile",
      );
    },
  });
};