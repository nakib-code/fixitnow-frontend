import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Booking = {
  id: string;
  bookingDate: string;
  status: string;
  customer: {
    name: string;
  };
  service: {
    title: string;
  };
};

type Props = {
  bookings: Booking[];
};

const RecentBookings = ({ bookings }: Props) => {
  return (
    <div className="app-card overflow-hidden border border-border bg-card shadow-sm">
      <div className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest booking requests
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium text-foreground">
                      {booking.customer.name}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {booking.service.title}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {new Date(
                        booking.bookingDate
                      ).toLocaleDateString("en-BD")}
                    </TableCell>

                    <TableCell>
                      <Badge className="rounded-full px-3 py-1">
                        {booking.status.replaceAll("_", " ")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;