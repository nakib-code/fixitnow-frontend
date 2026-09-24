"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { cancelBooking } from "@/services/booking/booking.api";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,

    onSuccess: async () => {
      toast.success("Booking cancelled successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to cancel booking."
        );
      } else {
        toast.error("Something went wrong.");
      }
    },
  });
};