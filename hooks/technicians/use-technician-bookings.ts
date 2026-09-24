"use client";

import { useQuery } from "@tanstack/react-query";

import { getTechnicianBookings } from "@/services/technician/technician.api";
import { TechnicianBooking } from "@/types/technician";


export const useTechnicianBookings = () => {
  return useQuery<TechnicianBooking[], Error>({
    queryKey: ["technician-bookings"],
    queryFn: getTechnicianBookings,
    staleTime: 1000 * 60 * 5,
  });
};