"use client";

import { useQuery } from "@tanstack/react-query";

import { getSingleService } from "@/services/services/service.api";
import { Service } from "@/types/service";

export const useSingleService = (id: string) => {
  return useQuery<Service>({
    queryKey: ["service", id],
    queryFn: () => getSingleService(id),
    enabled: Boolean(id),
  });
};