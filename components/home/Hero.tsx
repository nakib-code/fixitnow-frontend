"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTechnicians } from "@/hooks/technicians/use-technicians";
import { useServices } from "@/hooks/services/use-services";
import { useReviews } from "@/hooks/reviews/useReviews";

export default function Hero() {
  const { data: technicians = [], isLoading: techniciansLoading } =
    useTechnicians();

  const { data: services = [], isLoading: servicesLoading } =
    useServices();

  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();

  const technicianCount = technicians.length;
  const serviceCount = services.length;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  const formattedRating =
    averageRating > 0 ? averageRating.toFixed(1) : "—";

  const statsLoading =
    techniciansLoading || servicesLoading;

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-40 size-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary sm:text-sm">
            <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
              <Wrench className="size-3.5" />
            </span>

            Trusted Home Service Marketplace
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Home,
            <span className="block text-primary">
              Our Expertise.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Book trusted professionals for plumbing, electrical,
            AC repair, cleaning, painting, and more — all in one
            place.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="flex-1 sm:flex-none"
            >
              <Button
                size="lg"
                className="h-12 w-full gap-2 rounded-xl px-6 sm:w-auto"
              >
                Browse Services

                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link
              href="/auth/register"
              className="flex-1 sm:flex-none"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-xl px-6 sm:w-auto"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Trust Points */}
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <CheckCircle2 className="size-4 text-green-500" />
              Verified Technicians
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <ShieldCheck className="size-4 text-primary" />
              Secure Payments
            </div>
          </div>

          {/* Real Stats */}
          <div className="mt-10 grid grid-cols-3 divide-x divide-border border-y border-border py-5">
            {/* Technicians */}
            <div className="pr-3">
              {statsLoading ? (
                <>
                  <div className="h-7 w-16 animate-pulse rounded-md bg-muted" />
                  <div className="mt-2 h-4 w-20 animate-pulse rounded bg-muted" />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    {technicianCount}+
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Technicians
                  </p>
                </>
              )}
            </div>

            {/* Services */}
            <div className="px-3">
              {statsLoading ? (
                <>
                  <div className="h-7 w-16 animate-pulse rounded-md bg-muted" />
                  <div className="mt-2 h-4 w-16 animate-pulse rounded bg-muted" />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    {serviceCount}+
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Services
                  </p>
                </>
              )}
            </div>

            {/* Rating */}
            <div className="pl-3">
              {reviewsLoading ? (
                <>
                  <div className="h-7 w-16 animate-pulse rounded-md bg-muted" />
                  <div className="mt-2 h-4 w-16 animate-pulse rounded bg-muted" />
                </>
              ) : (
                <>
                  <h3 className="flex items-center gap-1 text-xl font-bold text-foreground sm:text-2xl">
                    {formattedRating}

                    {averageRating > 0 && (
                      <Star className="size-4 fill-accent text-accent sm:size-5" />
                    )}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Customer Rating
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto hidden w-full max-w-lg lg:block">
          {/* Main Circle */}
          <div className="relative mx-auto flex aspect-square max-w-[460px] items-center justify-center rounded-full border border-primary/10 bg-primary/5">
            <div className="absolute inset-8 rounded-full border border-primary/10 bg-primary/5" />

            <div className="relative flex size-44 items-center justify-center rounded-[2rem] bg-primary shadow-2xl shadow-primary/20">
              <Wrench className="size-24 text-primary-foreground" />
            </div>

            {/* Orange Accent */}
            <div className="absolute right-12 top-16 size-5 rounded-full bg-accent shadow-lg shadow-accent/30" />

            <div className="absolute bottom-20 left-14 size-3 rounded-full bg-primary/40" />
          </div>

          {/* Verified Card */}
          <div className="absolute left-0 top-16 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-black/5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-green-500/10">
              <ShieldCheck className="size-5 text-green-500" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                Verified Professionals
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Trusted & experienced
              </p>
            </div>
          </div>

          {/* Rating Card */}
          <div className="absolute bottom-14 right-0 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-black/5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/15">
              <Star className="size-5 fill-accent text-accent" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                {averageRating > 0
                  ? `${formattedRating} / 5 Rating`
                  : "No ratings yet"}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {reviews.length > 0
                  ? `From ${reviews.length} customer ${
                      reviews.length === 1 ? "review" : "reviews"
                    }`
                  : "Be the first to review"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}