import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center shadow-2xl shadow-primary/20 sm:px-10 sm:py-16 lg:px-16">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-48 rounded-full bg-white/10 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full bg-black/10 blur-3xl" />

          <div className="pointer-events-none absolute right-10 top-10 hidden rotate-12 opacity-10 sm:block">
            <Wrench className="size-32 text-white" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Get help when you need it
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Need a service
              <span className="block">today?</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-primary-foreground/80 sm:text-base">
              Find a trusted professional, book your service, and get
              your home back in shape — quickly and easily.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/services">
                <Button
                  size="lg"
                  className="group h-12 rounded-xl bg-background px-6 font-semibold text-foreground shadow-lg hover:bg-background/90"
                >
                  Find a Service
                  <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-12 rounded-xl px-6 font-semibold text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-primary-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Verified professionals
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Secure payment
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Easy booking
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}