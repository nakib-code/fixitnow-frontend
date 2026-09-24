"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";
import { useAdminBookings } from "@/hooks/admin/use-admin-bookings";

const BookingsTable = () => {
  const { data: bookings = [], isLoading } = useAdminBookings();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="app-card overflow-hidden border border-border bg-card">
          <div className="space-y-4 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-10 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Booking Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            View and manage all bookings.
          </p>
        </div>

        <div className="app-card border border-border bg-card p-10 text-center">
          <h2 className="text-xl font-bold text-foreground">
            No Bookings Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are no bookings available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Booking Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          View and manage all bookings.
        </p>
      </div>

      <div className="app-card overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking: any) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.customer?.name || "N/A"}
                  </TableCell>

                  <TableCell>
                    {booking.technician?.name || "N/A"}
                  </TableCell>

                  <TableCell>
                    {booking.service?.title || "N/A"}
                  </TableCell>

                  <TableCell className="font-medium">
                    ৳{Number(booking.totalAmount || 0).toLocaleString("en-BD")}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>

                  <TableCell>
                    <PaymentBadge status={booking.payment?.status} />
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {booking.bookingDate
                      ? new Date(
                          booking.bookingDate
                        ).toLocaleDateString("en-BD")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;