"use client";

import { getMyPayments } from "@/services/payment/payment.api";
import { useQuery } from "@tanstack/react-query";


export const usePayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getMyPayments,
  });
};