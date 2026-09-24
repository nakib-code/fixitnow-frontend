"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useTechnicianBookings } from "@/hooks/technicians/use-technician-bookings";
import { useUpdateBookingStatus } from "@/hooks/bookings/use-update-booking-status";

import { TechnicianBooking } from "@/types/technician";

export default function TechnicianBookings() {
  const {
    data: bookings = [],
    isLoading,
  } = useTechnicianBookings();

  const {
    mutate,
    isPending,
  } = useUpdateBookingStatus();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading bookings...
        </p>
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
          <h2 className="text-xl font-semibold text-foreground">
            No bookings found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You don&apos;t have any booking requests yet.
          </p>
        </div>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      REQUESTED:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

      ACCEPTED:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

      PAID:
        "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

      IN_PROGRESS:
        "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

      COMPLETED:
        "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",

      CANCELLED:
        "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    };

    return (
      styles[status] ||
      "bg-muted text-muted-foreground"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Booking Requests
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage your incoming service booking requests.
        </p>
      </div>

      {/* Bookings Table */}
      <div className="app-card overflow-hidden border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map(
                (booking: TechnicianBooking) => (
                  <TableRow key={booking.id}>
                    {/* Customer */}
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">
                          {booking.customer.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {booking.customer.email}
                        </p>
                      </div>
                    </TableCell>

                    {/* Service */}
                    <TableCell className="font-medium text-foreground">
                      {booking.service.title}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="whitespace-nowrap font-medium text-foreground">
                      ৳
                      {Number(
                        booking.service.price
                      ).toLocaleString("en-BD")}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {new Date(
                        booking.bookingDate
                      ).toLocaleDateString("en-BD")}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status.replaceAll("_", " ")}
                      </span>
                    </TableCell>

                    {/* Action */}
                    <TableCell>
                      {booking.status === "REQUESTED" && (
                        <Button
                          type="button"
                          size="sm"
                          disabled={isPending}
                          onClick={() =>
                            mutate({
                              id: booking.id,
                              status: "ACCEPTED",
                            })
                          }
                          className="rounded-xl"
                        >
                          Accept
                        </Button>
                      )}

                      {booking.status === "ACCEPTED" && (
                        <Button
                          type="button"
                          size="sm"
                          disabled={isPending}
                          onClick={() =>
                            mutate({
                              id: booking.id,
                              status: "IN_PROGRESS",
                            })
                          }
                          className="rounded-xl"
                        >
                          Start Job
                        </Button>
                      )}

                      {booking.status === "IN_PROGRESS" && (
                        <Button
                          type="button"
                          size="sm"
                          disabled={isPending}
                          onClick={() =>
                            mutate({
                              id: booking.id,
                              status: "COMPLETED",
                            })
                          }
                          className="rounded-xl"
                        >
                          Complete
                        </Button>
                      )}

                      {booking.status === "COMPLETED" && (
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Completed
                        </span>
                      )}

                      {booking.status === "CANCELLED" && (
                        <span className="text-sm font-medium text-destructive">
                          Cancelled
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}