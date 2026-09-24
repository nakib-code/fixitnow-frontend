"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  updateTechnicianProfile,
} from "@/services/technician/technician.api";

export const useUpdateTechnicianProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTechnicianProfile,

    onSuccess: () => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["technician-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });

      queryClient.invalidateQueries({
        queryKey: ["technicians"],
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