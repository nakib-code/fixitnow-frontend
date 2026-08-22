"use client";

import Link from "next/link";
import {
  AirVent,
  ArrowUpRight,
  Brush,
  ChevronRight,
  Droplets,
  Hammer,
  Paintbrush,
  Plug,
  Sparkles,
  Wrench,
} from "lucide-react";

import { useCategories } from "@/hooks/use-categories";
import { ICategory } from "@/types/category";

const categoryIcons = [
  Wrench,
  Droplets,
  Plug,
  AirVent,
  Paintbrush,
  Brush,
  Hammer,
  Sparkles,
];

export default function Categories() {
  const {
    data: categories = [],
    isLoading,
  } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="h-8 w-52 animate-pulse rounded-lg bg-muted" />

          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted" />

          {/* Cards Skeleton */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-3xl bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-20 size-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 size-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="size-4" />
              </span>

              Our Services
            </div>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Everything your home
              <span className="text-primary"> needs.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              From quick repairs to complete home maintenance,
              find trusted professionals for every job.
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/services"
            className="group hidden items-center gap-2 text-sm font-semibold text-foreground sm:flex"
          >
            Explore all services

            <span className="flex size-9 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </span>
          </Link>
        </div>

        {/* Categories */}
        {categories.length > 0 ? (
          <>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {categories.map((category: ICategory, index: number) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  index={index}
                />
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 sm:hidden">
              <Link
                href="/services"
                className="flex h-12 items-center justify-between rounded-2xl border border-border bg-card px-4 text-sm font-semibold"
              >
                <span>Explore all services</span>

                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ChevronRight className="size-4" />
                </span>
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No service categories available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryItem({
  category,
  index,
}: {
  category: ICategory;
  index: number;
}) {
  /*
   * Temporary frontend icon system.
   *
   * Backend-এ icon field add করার পরে
   * এই অংশটা সহজেই replace করা যাবে।
   */
  const Icon = categoryIcons[index % categoryIcons.length];

  return (
    <Link
      href={`/services?category=${encodeURIComponent(category.id)}`}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-6"
    >
      {/* Number */}
      <span className="absolute right-4 top-4 text-xs font-medium text-muted-foreground/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon Area */}
      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </div>

      {/* Content */}
      <div className="mt-8">
        <h3 className="line-clamp-1 text-sm font-bold text-foreground sm:text-base">
          {category.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          Explore

          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="pointer-events-none absolute -bottom-8 -right-8 size-20 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-[2]" />
    </Link>
  );
}