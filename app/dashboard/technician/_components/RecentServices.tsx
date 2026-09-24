import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Service = {
  id: string;
  title: string;
  price: string | number;
  isAvailable: boolean;
  category?: {
    name: string;
  };
};

type Props = {
  services: Service[];
};

const RecentServices = ({ services }: Props) => {
  return (
    <div className="app-card overflow-hidden border border-border bg-card shadow-sm">
      <div className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            My Recent Services
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest created services
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium text-foreground">
                      {service.title}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {service.category?.name ?? "N/A"}
                    </TableCell>

                    <TableCell className="whitespace-nowrap font-medium text-foreground">
                      ৳{Number(service.price).toLocaleString("en-BD")}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          service.isAvailable
                            ? "default"
                            : "destructive"
                        }
                        className="rounded-full px-3 py-1"
                      >
                        {service.isAvailable
                          ? "Available"
                          : "Unavailable"}
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
                    No services found.
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

export default RecentServices;