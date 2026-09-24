"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllBookings } from "@/services/admin/admin.api";
import { IBooking } from "@/types/booking";

export const useAdminBookings = () => {
  return useQuery<IBooking[]>({
    queryKey: ["admin-bookings"],
    queryFn: getAllBookings,
  });
};