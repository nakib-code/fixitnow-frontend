"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyServices } from "@/services/services/service.api";
import { Service } from "@/types/service";

export const useMyServices = () => {
  return useQuery<Service[]>({
    queryKey: ["my-services"],
    queryFn: getMyServices,
    staleTime: 0,
  });
};