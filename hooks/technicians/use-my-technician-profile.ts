"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyTechnicianProfile } from "@/services/technician/technician.api";

export const useMyTechnicianProfile = () => {
  return useQuery({
    queryKey: ["technician-profile"],
    queryFn: getMyTechnicianProfile,
  });
};