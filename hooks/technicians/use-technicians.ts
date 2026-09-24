"use client";

import { useQuery } from "@tanstack/react-query";

import { getTechnicians } from "@/services/technician/technician.api";
import { Technician } from "@/types/technician";


export const useTechnicians = () => {

  return useQuery<Technician[], Error>({
    queryKey: ["technicians"],
    queryFn: getTechnicians,
    staleTime: 1000 * 60 * 5,
  });

};