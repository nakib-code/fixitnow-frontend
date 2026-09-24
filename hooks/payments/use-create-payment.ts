"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPayment } from "@/services/payment/payment.api";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,

    onSuccess: (data) => {
      toast.success("Redirecting to payment...");

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Payment failed"
      );
    },
  });
};