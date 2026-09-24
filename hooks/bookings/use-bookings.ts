"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "@/services/booking/booking.api";
import { IBooking } from "@/types/booking";

export const useBookings = () => {
  return useQuery<IBooking[]>({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });
};