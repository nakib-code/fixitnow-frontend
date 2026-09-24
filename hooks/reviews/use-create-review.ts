"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createReview,
  TCreateReview,
} from "@/services/review/review.api";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateReview) => createReview(payload),

    onSuccess: () => {
      toast.success("Review submitted successfully.");

      // Update customer booking list
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });

      // Update admin booking list
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings"],
      });

      // Update public reviews
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit review"
      );
    },
  });
};