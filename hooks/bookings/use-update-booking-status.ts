"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateBookingStatus } from "@/services/technician/technician.api";

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBookingStatus,

    onSuccess: () => {
      toast.success("Booking status updated");

      // Technician dashboard refresh
      queryClient.invalidateQueries({
        queryKey: ["technician-bookings"],
      });

      // Customer dashboard refresh
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });

      // Admin dashboard থাকলে
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update status"
      );
    },
  });
};