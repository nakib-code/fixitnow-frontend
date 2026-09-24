"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyTechnicianProfile } from "@/services/technician/technician.api";
import { TechnicianProfile } from "@/types/technician";

export const useTechnicianProfile = () => {
  return useQuery<TechnicianProfile>({
    queryKey: ["technician-profile"],
    queryFn: getMyTechnicianProfile,
  });
};