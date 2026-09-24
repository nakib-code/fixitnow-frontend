"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { ThemeToggle } from "../theme/theme-toggle";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Technicians",
    href: "/technicians",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
  },
];

export default function Navbar() {
  const { user } = useCurrentUser();

  const dashboardHref = user
    ? `/dashboard/${user.role.toLowerCase()}`
    : "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center"
          aria-label="FixItNow Home"
        >
          <Image
            src="/logo.png"
            alt="FixItNow"
            width={400}
            height={400}
            priority
            className="size-50 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          {user ? (
            <Link href={dashboardHref}>
              <Button className="group h-10 gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
                Dashboard
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="h-10 rounded-xl px-4 font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                >
                  Login
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button className="h-10 rounded-xl bg-primary px-5 font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              className="flex size-10 items-center justify-center rounded-xl text-foreground transition-all duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] max-w-sm border-l border-border bg-background px-0"
            >
              {/* Mobile Header */}
              <SheetHeader className="border-b border-border/60 px-5 py-5">
                <Link
                  href="/"
                  className="flex items-center"
                  aria-label="FixItNow Home"
                >
                  <Image
                    src="/logo.png"
                    alt="FixItNow"
                    width={48}
                    height={48}
                    className="size-12 object-contain"
                  />
                </Link>

                <SheetTitle className="sr-only">
                  FixItNow Navigation Menu
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Content */}
              <div className="flex flex-col px-5 py-6">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex min-h-12 items-center rounded-xl px-4 text-sm font-medium text-foreground transition-all duration-200 hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Authentication */}
                {user ? (
                  <Link
                    href={dashboardHref}
                    className="w-full"
                  >
                    <Button className="group h-12 w-full gap-2 rounded-xl bg-primary font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
                      Dashboard
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/auth/login"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="h-12 w-full rounded-xl border-border font-medium transition-all duration-200 hover:bg-muted"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link
                      href="/auth/register"
                      className="w-full"
                    >
                      <Button className="h-12 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}