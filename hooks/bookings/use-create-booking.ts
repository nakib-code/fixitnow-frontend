"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createBooking,
  TCreateBooking,
} from "@/services/booking/booking.api";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateBooking) =>
      createBooking(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    },
  });
};