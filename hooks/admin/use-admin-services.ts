"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllServices } from "@/services/admin/admin.api";
import { Service } from "@/types/service";

export const useAdminServices = () => {
  return useQuery<Service[]>({
    queryKey: ["admin-services"],
    queryFn: getAllServices,
  });
};