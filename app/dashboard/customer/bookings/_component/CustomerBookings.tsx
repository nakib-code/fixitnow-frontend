"use client";

import { Button } from "@/components/ui/button";

import { useBookings } from "@/hooks/bookings/use-bookings";
import { useCancelBooking } from "@/hooks/bookings/use-cancel-booking";

import ReviewDialog from "@/components/review/ReviewDialog";
import PaymentButton from "@/app/dashboard/customer/payments/create/_components/PaymentButton";

export default function CustomerBookings() {
  const { data: bookings, isLoading } = useBookings();
  const { mutate: cancelBooking } = useCancelBooking();

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      REQUESTED:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
      ACCEPTED:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
      PAID:
        "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
      IN_PROGRESS:
        "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
      COMPLETED:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
      CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    };

    return (
      styles[status] ||
      "bg-muted text-muted-foreground"
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="app-card border border-border bg-card p-6">
          <div className="space-y-4">
            <div className="h-6 w-64 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Bookings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            View and manage your service bookings.
          </p>
        </div>

        <div className="app-card border border-border bg-card p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            No bookings found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Book your first service to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Bookings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          View and manage your service bookings.
        </p>
      </div>

      {/* Bookings */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="app-card border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
          >
            {/* Booking Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                {booking.service.title}
              </h2>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${getStatusStyle(
                  booking.status
                )}`}
              >
                {booking.status.replaceAll("_", " ")}
              </span>
            </div>

            {/* Booking Details */}
            <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Technician
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {booking.technician.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Date
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {new Date(booking.bookingDate).toLocaleDateString(
                    "en-BD"
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Time
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Address
                </p>

                <p className="mt-1 font-medium text-foreground">
                  {booking.address}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Amount
                </p>

                <p className="mt-1 font-semibold text-primary">
                  ৳{Number(booking.totalAmount).toLocaleString("en-BD")}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-5">
              {booking.status === "REQUESTED" && (
                <Button
                  variant="destructive"
                  onClick={() => cancelBooking(booking.id)}
                  className="rounded-xl"
                >
                  Cancel Booking
                </Button>
              )}

              {booking.status === "ACCEPTED" && (
                <PaymentButton bookingId={booking.id} />
              )}

              {booking.status === "PAID" && (
                <div className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  Payment Completed
                </div>
              )}

              {booking.status === "COMPLETED" &&
                !booking.review && (
                  <ReviewDialog bookingId={booking.id} />
                )}
            </div>

            {/* Review */}
            {booking.review && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-500/20 dark:bg-green-500/10">
                <h3 className="font-semibold text-foreground">
                  Your Review
                </h3>

                <p className="mt-2 font-medium text-foreground">
                  ⭐ {booking.review.rating}/5
                </p>

                {booking.review.comment && (
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {booking.review.comment}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}