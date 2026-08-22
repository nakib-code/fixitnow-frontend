import Link from "next/link";
import { ArrowLeft, Home, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="mx-auto w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
          <Wrench className="size-10 rotate-12" />
        </div>

        {/* 404 */}
        <p className="mt-8 text-7xl font-black tracking-tight text-primary sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Service Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Sorry, we couldn&apos;t find the page or service you&apos;re
          looking for. It may have been removed or the link may be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/">
            <Button className="h-11 w-full rounded-xl px-6 sm:w-auto">
              <Home className="size-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/services">
            <Button
              variant="outline"
              className="h-11 w-full rounded-xl px-6 sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              Browse Services
            </Button>
          </Link>
        </div>

        {/* Small branding */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="size-4" />
          </div>

          <span>
            FixIt<span className="font-semibold text-primary">Now</span>
          </span>
        </div>
      </div>
    </main>
  );
}