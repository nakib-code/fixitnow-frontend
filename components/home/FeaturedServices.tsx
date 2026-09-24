"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Wrench,
} from "lucide-react";

import { useServices } from "@/hooks/services/use-services";

export default function FeaturedServices() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices();

  if (isLoading) {
    return (
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="space-y-3">
            <div className="h-6 w-36 animate-pulse rounded-md bg-muted" />

            <div className="h-9 w-64 animate-pulse rounded-lg bg-muted" />

            <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
          </div>

          {/* Cards Skeleton */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="app-card h-80 animate-pulse bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-destructive/10">
            <Wrench className="size-5 text-destructive" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-foreground">
            Unable to load services
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const featuredServices = services.slice(0, 6);

  if (featuredServices.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 top-20 size-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Popular Services
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Services people
              <span className="text-primary"> love.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Discover our most requested home services and book a trusted
              professional in just a few clicks.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            href="/services"
            className="group hidden items-center gap-2 app-card border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary sm:inline-flex"
          >
            View all services

            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Service Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service: any) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="app-card group block overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-muted">
                {service.image ? (
                  <>
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-primary/5">
                    <Wrench className="size-12 text-primary/30" />
                  </div>
                )}

                {/* Category */}
                {service.category?.name && (
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {service.category.name}
                  </span>
                )}

                {/* Arrow */}
                <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                  {service.name}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>

                    <p className="mt-0.5 text-lg font-bold text-primary">
                      ${service.price}
                    </p>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                    Book service

                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View all services

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}