"use client";

import { useQuery } from "@tanstack/react-query";

import { Service } from "@/types/service";
import { getServices } from "@/services/services/service.api";

export const useServices = (
  search?: string,
  category?: string,
) => {
  return useQuery<Service[]>({
    queryKey: ["services", search, category],
    queryFn: () => getServices(search, category),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
};