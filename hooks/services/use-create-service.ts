"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createService } from "@/services/services/service.api";

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,

    onSuccess: () => {
      toast.success("Service created successfully");

      // Admin service list refresh
      queryClient.invalidateQueries({
        queryKey: ["admin-services"],
      });

      // যদি customer service list থাকে
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to create service"
      );
    },
  });
};