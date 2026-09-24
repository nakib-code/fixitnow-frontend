"use client";

import { Loader2 } from "lucide-react";

import { useTechnicianBookings } from "@/hooks/technicians/use-technician-bookings";

import RequestCard from "./RequestCard";

export default function TechnicianRequests() {
  const {
    data: bookings = [],
    isLoading,
  } = useTechnicianBookings();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-primary" />
          Loading booking requests...
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Booking Requests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage your incoming service booking requests.
          </p>
        </div>

        <div className="app-card border border-border bg-card p-10 text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            No Booking Requests
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You don&apos;t have any booking requests yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Booking Requests
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage your incoming service booking requests.
        </p>
      </div>

      <div className="space-y-5">
        {bookings.map((booking: any) => (
          <RequestCard
            key={booking.id}
            booking={booking}
          />
        ))}
      </div>
    </div>
  );
}