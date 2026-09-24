"use client";

import ServiceCard from "@/app/dashboard/technician/services/_components/ServiceCard";
import { useMyServices } from "@/hooks/services/use-my-services";

export default function MyServices() {
  const {
    data: services = [],
    isLoading,
  } = useMyServices();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading services...
        </p>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My Services
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage the services you offer to customers.
          </p>
        </div>

        <div className="app-card border border-border bg-card p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
            No Services Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first service to start receiving
            bookings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Services
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage the services you offer to customers.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}