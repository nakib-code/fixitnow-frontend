"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { use } from "react";

import { useTechnicians } from "@/hooks/technicians/use-technicians";
import { Technician } from "@/types/technician";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function TechnicianDetailsPage({ params }: Props) {
  const { id: technicianId } = use(params);

  const {
    data: technicians = [],
    isLoading,
    isError,
  } = useTechnicians();

  const technician = technicians.find(
    (tech: Technician) => tech.id === technicianId
  );

  // Loading
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="app-card animate-pulse border border-border bg-card p-6 sm:p-10">
            <div className="h-5 w-32 rounded bg-muted" />

            <div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="size-32 rounded-xl bg-muted sm:size-40" />

              <div className="w-full space-y-4">
                <div className="h-8 w-56 rounded bg-muted" />
                <div className="h-4 w-72 rounded bg-muted" />
                <div className="h-4 w-48 rounded bg-muted" />

                <div className="flex gap-2">
                  <div className="h-8 w-24 rounded-full bg-muted" />
                  <div className="h-8 w-28 rounded-full bg-muted" />
                  <div className="h-8 w-32 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // API Error
  if (isError) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="app-card w-full max-w-lg border border-border bg-card p-10 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-destructive/10">
              <Wrench className="size-6 text-destructive" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-foreground">
              Unable to load technician
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Something went wrong while loading this technician profile.
              Please try again later.
            </p>

            <Link
              href="/technicians"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="size-4" />
              Back to technicians
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Technician Not Found
  if (!technician) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="app-card w-full max-w-lg border border-border bg-card p-10 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary/10">
              <Wrench className="size-6 text-primary" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-foreground">
              Technician not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The technician you are looking for does not exist or may have
              been removed.
            </p>

            <Link
              href="/technicians"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="size-4" />
              Browse technicians
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const isAvailable =
    technician.status?.toLowerCase() === "available";

  const rating =
    typeof technician.averageRating === "number"
      ? technician.averageRating
      : 0;

  const experience =
    typeof technician.experience === "number"
      ? technician.experience
      : 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/20">
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Back Button */}
          <Link
            href="/technicians"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to technicians
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Profile Card */}
            <div className="app-card border border-border bg-card p-6 sm:p-8">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
                {/* Profile Image */}
                <div className="relative mx-auto shrink-0 sm:mx-0">
                  {technician.profileImg ? (
                    <Image
                      src={technician.profileImg}
                      alt={technician.name}
                      width={160}
                      height={160}
                      className="size-32 rounded-xl object-cover ring-4 ring-muted sm:size-40"
                    />
                  ) : (
                    <div className="flex size-32 items-center justify-center rounded-xl bg-primary/10 text-primary ring-4 ring-muted sm:size-40">
                      <Wrench className="size-12 sm:size-14" />
                    </div>
                  )}

                  {/* Verified Badge */}
                  <div className="absolute -right-2 -top-2 flex size-9 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm">
                    <CheckCircle2 className="size-4" />
                  </div>
                </div>

                {/* Technician Info */}
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {technician.name}
                    </h1>

                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      <ShieldCheck className="size-3.5" />
                      Verified
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Professional Technician
                  </p>

                  {/* Stats */}
                  <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {/* Availability */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                      <span
                        className={`size-1.5 rounded-full ${
                          isAvailable
                            ? "bg-green-500"
                            : "bg-muted-foreground"
                        }`}
                      />

                      {technician.status || "Unavailable"}
                    </span>

                    {/* Rating */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                      <Star className="size-3.5 fill-accent text-accent" />
                      {rating.toFixed(1)} Rating
                    </span>

                    {/* Experience */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                      <BriefcaseBusiness className="size-3.5" />

                      {experience}{" "}
                      {experience === 1 ? "Year" : "Years"} Experience
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:mx-0">
                    {technician.bio ||
                      "Experienced professional technician ready to help with your home service needs."}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <aside className="app-card border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 className="size-5" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-foreground">
                Need a service?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Book this technician and get professional help for your home.
              </p>

              <Link
                href={`/services?technician=${encodeURIComponent(
                  technician.id
                )}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                Book a service
                <ArrowRight className="size-4" />
              </Link>

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <MessageCircle className="size-4" />
                Contact technician
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Rating */}
            <div className="app-card border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10">
                  <Star className="size-5 fill-accent text-accent" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Average Rating
                  </p>

                  <p className="mt-0.5 text-xl font-bold text-foreground">
                    {rating.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${
                      index < Math.round(rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="app-card border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BriefcaseBusiness className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Professional Experience
                  </p>

                  <p className="mt-0.5 text-xl font-bold text-foreground">
                    {experience}{" "}
                    {experience === 1 ? "Year" : "Years"}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Skilled professional with experience in delivering reliable
                home services.
              </p>
            </div>

            {/* Location */}
            <div className="app-card border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Service Location
                  </p>

                  <p className="mt-0.5 text-lg font-bold text-foreground">
                    Local Service Area
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Available for home service bookings in their service area.
              </p>
            </div>
          </div>

          {/* About */}
          <div className="app-card mt-5 border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Wrench className="size-5" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  About {technician.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Professional technician profile
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">
              {technician.bio ||
                `${technician.name} is a professional technician focused on providing reliable and quality home services. Book a service to get started.`}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}