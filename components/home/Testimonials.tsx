"use client";

import { useReviews } from "@/hooks/reviews/useReviews";
import {
  CheckCircle2,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";


export default function Testimonials() {
  const { data: reviews = [], isLoading } = useReviews();

  return (
    <section className="relative overflow-hidden bg-muted/20 py-16 sm:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute right-0 top-0 size-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Customer Stories
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Loved by our
            <span className="text-primary"> customers.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Real experiences from customers who trusted FixItNow for their
            home service needs.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="app-card border border-border bg-card p-6 sm:p-7"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />

                <div className="mt-6 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  <div className="size-11 animate-pulse rounded-full bg-muted" />

                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))
          ) : reviews.length > 0 ? (
            reviews.map((item) => (
              <article
                key={item.id}
                className="app-card group relative border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
              >
                {/* Quote Icon */}
                <div className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Quote className="size-5" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base">
                  “{item.comment || "Great service experience."}”
                </blockquote>

                {/* Customer */}
                <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                  {/* Avatar */}
                  {item.customer.profileImg ? (
                    <img
                      src={item.customer.profileImg}
                      alt={item.customer.name}
                      className="size-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.customer.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-foreground">
                        {item.customer.name}
                      </h3>

                      <CheckCircle2 className="size-3.5 text-primary" />
                    </div>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="app-card col-span-full border border-border bg-card p-10 text-center">
              <Quote className="mx-auto size-10 text-primary/30" />

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No reviews yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Customer reviews will appear here after completed bookings.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Trust Indicator */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4 fill-accent text-accent"
              />
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Trusted by customers for reliable home services
          </p>
        </div>
      </div>
    </section>
  );
}