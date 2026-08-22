import Link from "next/link";
import { Wrench, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
                <Wrench className="size-5" />
              </div>

              <span className="text-xl font-bold tracking-tight text-foreground">
                FixIt<span className="text-primary">Now</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Your trusted home service marketplace. Find skilled
              professionals and book reliable services with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Quick Links
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>

              <Link
                href="/services"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Services
              </Link>

              <Link
                href="/how-it-works"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Company
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>

              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Get Started
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t border-border py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} FixItNow. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}