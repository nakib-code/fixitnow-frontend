"use client";

import { useQuery } from "@tanstack/react-query";

import { getSinglePayment } from "@/services/payment/payment.api";
import { IPayment } from "@/types/payment";

export const usePayment = (id: string) => {
  return useQuery<IPayment>({
    queryKey: ["payment", id],
    queryFn: () => getSinglePayment(id),
    enabled: Boolean(id),
    staleTime: 0,
  });
};