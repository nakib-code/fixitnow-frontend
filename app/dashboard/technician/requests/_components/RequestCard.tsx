"use client";

import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  User,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import StatusBadge from "./StatusBadge";

import { useUpdateBookingStatus } from "@/hooks/bookings/use-update-booking-status";

interface Props {
  booking: any;
}

export default function RequestCard({
  booking,
}: Props) {
  const { mutate, isPending } =
    useUpdateBookingStatus();

  const formattedDate = booking.bookingDate
    ? new Date(
        booking.bookingDate
      ).toLocaleDateString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const handleStatusUpdate = (
    status: "ACCEPTED" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    mutate({
      id: booking.id,
      status,
    });
  };

  return (
    <div className="app-card border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Service Request
          </p>

          <h2 className="mt-1 truncate text-xl font-bold tracking-tight text-foreground">
            {booking.service?.title || "Service"}
          </h2>
        </div>

        <div className="shrink-0">
          <StatusBadge status={booking.status} />
        </div>
      </div>

      {/* Booking Information */}
      <div className="grid gap-4 py-5 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Customer
            </p>

            <p className="mt-0.5 truncate text-sm font-medium text-foreground">
              {booking.customer?.name || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Email
            </p>

            <p className="mt-0.5 truncate text-sm font-medium text-foreground">
              {booking.customer?.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Service Address
            </p>

            <p className="mt-0.5 text-sm font-medium leading-6 text-foreground">
              {booking.address || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarDays className="size-4" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Booking Date
            </p>

            <p className="mt-0.5 text-sm font-medium text-foreground">
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Clock3 className="size-4" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Time
            </p>

            <p className="mt-0.5 text-sm font-medium text-foreground">
              {booking.startTime || "N/A"}{" "}
              {booking.endTime
                ? `- ${booking.endTime}`
                : ""}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wallet className="size-4" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Total Amount
            </p>

            <p className="mt-0.5 text-base font-bold text-foreground">
              ৳
              {Number(
                booking.totalAmount || 0
              ).toLocaleString("en-BD")}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {(booking.status === "REQUESTED" ||
        booking.status === "ACCEPTED" ||
        booking.status === "IN_PROGRESS") && (
        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          {booking.status === "REQUESTED" && (
            <Button
              type="button"
              disabled={isPending}
              onClick={() =>
                handleStatusUpdate("ACCEPTED")
              }
              className="btn-primary"
            >
              {isPending
                ? "Updating..."
                : "Accept Request"}
            </Button>
          )}

          {booking.status === "ACCEPTED" && (
            <Button
              type="button"
              disabled={isPending}
              onClick={() =>
                handleStatusUpdate("IN_PROGRESS")
              }
              className="btn-primary"
            >
              {isPending
                ? "Updating..."
                : "Start Job"}
            </Button>
          )}

          {booking.status === "IN_PROGRESS" && (
            <Button
              type="button"
              disabled={isPending}
              onClick={() =>
                handleStatusUpdate("COMPLETED")
              }
              className="btn-primary"
            >
              {isPending
                ? "Updating..."
                : "Complete Job"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}