"use client";

import ServiceCard from "@/app/dashboard/technician/services/_components/ServiceCard";
import { useMyServices } from "@/hooks/use-my-services";

export default function MyServices() {
  const {
    data: services,
    isLoading,
  } = useMyServices();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading services...
      </div>
    );
  }

  if (!services?.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Services Found
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first service.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          My Services
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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