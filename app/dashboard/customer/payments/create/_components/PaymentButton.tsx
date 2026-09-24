"use client";

import { Button } from "@/components/ui/button";
import { useCreatePayment } from "@/hooks/payments/use-create-payment";

interface Props {
  bookingId: string;
}

export default function PaymentButton({ bookingId }: Props) {
  const { mutate, isPending } = useCreatePayment();

  const handlePayment = () => {
    mutate({
      bookingId,
      provider: "SSLCOMMERZ",
    });
  };

  return (
    <Button
      type="button"
      onClick={handlePayment}
      disabled={isPending}
      className="rounded-xl bg-primary px-5 font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
    >
      {isPending ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}