import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Service",
    description:
      "Browse our wide range of home services and find the right service for your needs.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book a Technician",
    description:
      "Choose a professional technician, select your preferred date and time, and place your booking.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Get the Job Done",
    description:
      "Your technician arrives at your location and completes the service professionally.",
  },
];

const customerSteps = [
  "Browse available services",
  "Choose a trusted technician",
  "Select your preferred schedule",
  "Confirm your booking",
  "Get your service completed",
];

const technicianSteps = [
  "Create your professional profile",
  "Add the services you provide",
  "Receive customer booking requests",
  "Accept and complete jobs",
  "Build your reputation and earn",
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Connect with skilled and trusted technicians for your home service needs.",
  },
  {
    icon: Clock3,
    title: "Fast & Convenient",
    description:
      "Book a service whenever you need it with a simple and convenient process.",
  },
  {
    icon: CheckCircle2,
    title: "Reliable Service",
    description:
      "Get your home service completed by professionals who care about quality.",
  },
  {
    icon: Star,
    title: "Trusted Experience",
    description:
      "See technician ratings and reviews before choosing the right professional.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--primary)/10,transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <Wrench className="size-3.5" />
              Simple. Fast. Reliable.
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Home services made{" "}
              <span className="text-primary">simple.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              From finding the right professional to getting the job done,
              FixItNow makes the entire home service experience simple and
              hassle-free.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/services">
                <Button className="h-11 w-full rounded-xl px-6 sm:w-auto">
                  Browse Services
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-xl px-6 sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Get your service in 3 simple steps
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              No complicated process. Just find, book, and relax.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>

                    <span className="text-4xl font-black text-muted/80">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer & Technician */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              BUILT FOR EVERYONE
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              A better experience for everyone
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Whether you need help at home or provide professional services,
              FixItNow keeps everything simple.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Customer */}
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound className="size-6" />
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                For Customers
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Find reliable professionals and book the service you need in
                just a few clicks.
              </p>

              <div className="mt-6 space-y-4">
                {customerSteps.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </div>

                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <Link href="/services" className="mt-7 inline-block">
                <Button variant="outline" className="rounded-xl">
                  Find a Service
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            {/* Technician */}
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                <Wrench className="size-6" />
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                For Technicians
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Grow your professional service business by connecting with
                customers who need your skills.
              </p>

              <div className="mt-6 space-y-4">
                {technicianSteps.map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent-foreground">
                      {index + 1}
                    </div>

                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <Link href="/auth/register" className="mt-7 inline-block">
                <Button className="rounded-xl">
                  Join as a Technician
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              WHY FIXITNOW
            </p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Everything you need
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              We make finding and booking home services easier, safer, and
              more reliable.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 font-semibold">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-xl sm:px-10 sm:py-16">
            <div className="absolute -right-20 -top-20 size-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 size-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/15">
                <Wrench className="size-6" />
              </div>

              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                Ready to get started?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
                Find a trusted professional and get your home service done
                without the hassle.
              </p>

              <Link href="/services" className="mt-7 inline-block">
                <Button
                  size="lg"
                  className="rounded-xl bg-background px-6 text-foreground hover:bg-background/90"
                >
                  Browse Services
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}