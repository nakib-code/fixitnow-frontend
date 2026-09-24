"use client";

import ServicesFilter from "@/components/services/ServicesFilter";
import ServiceCard from "@/components/services/ServiceCard";
import { useServices } from "@/hooks/services/use-services";

interface ServicesPageContentProps {
  search: string;
  category: string;
}

export default function ServicesPageContent({
  search,
  category,
}: ServicesPageContentProps) {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices(search, category);

  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h1>

          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Find trusted professionals for all your home service needs.
          </p>
        </div>

        {/* Filter */}
        <ServicesFilter />

        {/* Loading */}
        {isLoading && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <p className="font-semibold text-destructive">
              Failed to load services
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong. Please try again later.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && services.length === 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No services found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your search or category filter.
            </p>
          </div>
        )}

        {/* Services */}
        {!isLoading && !isError && services.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}