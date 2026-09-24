"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteService } from "@/services/services/service.api";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,

    onSuccess: () => {
      toast.success("Service deleted successfully");

      // Admin service list refresh
      queryClient.invalidateQueries({
        queryKey: ["admin-services"],
      });

      // Customer service list থাকলে refresh
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete service"
      );
    },
  });
};