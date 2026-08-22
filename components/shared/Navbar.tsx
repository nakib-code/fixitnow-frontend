"use client";

import Link from "next/link";
import { ArrowRight, Menu, Wrench } from "lucide-react";

import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Navbar() {
  const { user, isLoading } = useCurrentUser();

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
      title: "How It Works",
      href: "/how-it-works",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="FixItNow Home"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Wrench className="size-5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            FixIt<span className="text-primary">Now</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          {isLoading ? null : user ? (
            <Link href={`/dashboard/${user.role.toLowerCase()}`}>
              <Button className="gap-2 rounded-xl px-5">
                Dashboard
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="rounded-xl px-4 text-sm font-medium"
                >
                  Login
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button className="rounded-xl px-5 shadow-sm">
                  Register
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
              className="flex size-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] max-w-sm border-l border-border bg-background px-0"
            >
              <SheetHeader className="border-b border-border/60 px-5 py-5">
                {/* Logo */}
                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                  aria-label="FixItNow Home"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Wrench className="size-5" />
                  </div>

                  <span className="text-xl font-bold tracking-tight text-foreground">
                    FixIt<span className="text-primary">Now</span>
                  </span>
                </Link>

                {/* Accessible Sheet Title */}
                <SheetTitle className="sr-only">
                  FixItNow Navigation Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col px-5 py-6">
                {/* Navigation */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex min-h-12 items-center rounded-xl px-4 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>

                <div className="my-6 h-px bg-border" />

                {/* Authentication */}
                {isLoading ? null : user ? (
                  <Link
                    href={`/dashboard/${user.role.toLowerCase()}`}
                    className="w-full"
                  >
                    <Button className="h-12 w-full gap-2 rounded-xl">
                      Dashboard
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/auth/login" className="w-full">
                      <Button
                        variant="outline"
                        className="h-12 w-full rounded-xl"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link href="/auth/register" className="w-full">
                      <Button className="h-12 w-full rounded-xl">
                        Register
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