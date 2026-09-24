"use client";

import {
  CheckCircle2,
  Clock3,
  MapPin,
  Mail,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";

import { useSingleService } from "@/hooks/services/use-single-service";
import BookingDialog from "@/components/booking/BookingDialog";

export default function ServiceDetails({
  id,
}: {
  id: string;
}) {
  const {
    data: service,
    isLoading,
  } = useSingleService(id);

  if (isLoading) {
    return (
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-2/3 rounded-lg bg-muted" />

            <div className="h-20 w-full rounded-2xl bg-muted" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-24 rounded-2xl bg-muted" />
              <div className="h-24 rounded-2xl bg-muted" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="bg-background px-4 py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Wrench className="size-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-foreground">
            Service not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            The service you are looking for may no longer be available.
          </p>
        </div>
      </section>
    );
  }

  // Technician
  const technician = service.technician?.user;

  // Full location
  const location = [
    technician?.villageOrArea,
    technician?.upazila?.name,
    technician?.district?.name,
    technician?.division?.name,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
          {/* Service Header */}
          <div className="border-b border-border bg-muted/20 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                {/* Category */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Wrench className="size-3.5" />

                  {service.category?.name}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {service.title}
                </h1>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {service.description}
                </p>
              </div>

              {/* Price */}
              <div className="shrink-0 rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 lg:min-w-36">
                <p className="text-xs font-medium text-muted-foreground">
                  Starting from
                </p>

                <p className="mt-1 text-2xl font-bold text-primary">
                  ৳{service.price}
                </p>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Duration */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="size-5" />
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Duration
                </p>

                <p className="mt-1 font-semibold text-foreground">
                  {service.duration} Minutes
                </p>
              </div>

              {/* Availability */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                  <CheckCircle2 className="size-5" />
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Availability
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    service.isAvailable
                      ? "text-green-600"
                      : "text-destructive"
                  }`}
                >
                  {service.isAvailable
                    ? "Available"
                    : "Unavailable"}
                </p>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Location
                </p>

                <p className="mt-1 line-clamp-2 font-semibold text-foreground">
                  {location || "Location not provided"}
                </p>
              </div>

              {/* Rating */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                  <Star className="size-5 fill-accent" />
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Rating
                </p>

                <p className="mt-1 font-semibold text-foreground">
                  {service.technician.averageRating} / 5
                </p>
              </div>
            </div>

            {/* Technician */}
            <div className="mt-10">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserRound className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold text-foreground">
                    Your Technician
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Professional service provider
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-muted/20 p-5 sm:p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    {technician?.profileImg ? (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl">
                        <img
                          src={technician.profileImg}
                          alt={technician.name}
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                        {technician?.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">
                          {technician?.name}
                        </h3>

                        <CheckCircle2 className="size-4 text-primary" />
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.technician.experience} years
                        experience
                      </p>
                    </div>
                  </div>

                  {/* Trust */}
                  <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-3 py-2 text-xs font-medium text-green-600">
                    <ShieldCheck className="size-4" />
                    Trusted Professional
                  </div>
                </div>

                {/* Technician Details */}
                <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-muted-foreground" />

                    <span className="truncate text-sm text-muted-foreground">
                      {technician?.email || "Email not provided"}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <span className="text-sm text-muted-foreground">
                      {location || "Location not provided"}
                    </span>
                  </div>
                </div>

                {/* Location Breakdown */}
                {location && (
                  <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    {technician?.villageOrArea && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Village / Area
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {technician.villageOrArea}
                        </p>
                      </div>
                    )}

                    {technician?.upazila?.name && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Upazila / Thana
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {technician.upazila.name}
                        </p>
                      </div>
                    )}

                    {technician?.district?.name && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          District
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {technician.district.name}
                        </p>
                      </div>
                    )}

                    {technician?.division?.name && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Division
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {technician.division.name}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Booking */}
            <div className="mt-8 rounded-3xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-foreground">
                    Ready to book this service?
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose your preferred time and book a
                    professional technician.
                  </p>
                </div>

                <div className="shrink-0">
                  <BookingDialog serviceId={service.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}