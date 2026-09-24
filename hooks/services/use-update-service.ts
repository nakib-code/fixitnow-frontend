"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateService } from "@/services/services/service.api";

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateService,

    onSuccess: () => {
      toast.success("Service updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["my-services"],
      });

      // Customer service list update হবে
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update service"
      );
    },
  });
};