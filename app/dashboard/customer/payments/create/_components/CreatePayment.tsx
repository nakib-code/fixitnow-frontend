"use client";

import { Button } from "@/components/ui/button";
import { useCreatePayment } from "@/hooks/payments/use-create-payment";

interface Props {
  bookingId: string;
}

export default function CreatePayment({ bookingId }: Props) {
  const { mutate, isPending } = useCreatePayment();

  const handlePayment = () => {
    mutate({
      bookingId,
      provider: "SSLCOMMERZ",
    });
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-lg sm:mt-12">
      <div className="app-card border border-border bg-card p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Complete Payment
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Click below to continue your payment securely
            using SSLCommerz.
          </p>
        </div>

        {/* Payment Action */}
        <div className="mt-8">
          <Button
            type="button"
            className="h-11 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
            onClick={handlePayment}
            disabled={isPending}
          >
            {isPending ? "Redirecting..." : "Pay with SSLCommerz"}
          </Button>
        </div>
      </div>
    </div>
  );
}