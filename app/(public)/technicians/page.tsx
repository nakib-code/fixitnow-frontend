"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { useTechnicians } from "@/hooks/technicians/use-technicians";
import { Technician } from "@/types/technician";

export default function TechniciansPage() {
  const {
    data: technicians = [],
    isLoading,
    isError,
  } = useTechnicians();

  const [search, setSearch] = useState("");

  const filteredTechnicians = technicians.filter((tech: Technician) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/20 py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Trusted Professionals
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Find the right
            <span className="text-primary"> technician.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Browse skilled and trusted professionals and find the right person
            for your home service needs.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 flex max-w-xl items-center rounded-xl border border-border bg-card px-4 shadow-sm transition-colors focus-within:border-primary/40">
            <Search className="size-5 shrink-0 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search technicians..."
              className="h-12 w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* Technicians */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Our technicians
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredTechnicians.length} professional
                {filteredTechnicians.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="app-card h-72 animate-pulse bg-muted"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div className="app-card mt-10 border border-border bg-card p-10 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-destructive/10">
                <Wrench className="size-5 text-destructive" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Unable to load technicians
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Something went wrong while loading technicians. Please try
                again later.
              </p>
            </div>
          )}

          {/* Empty */}
          {!isLoading &&
            !isError &&
            filteredTechnicians.length === 0 && (
              <div className="app-card mt-10 border border-border bg-card p-10 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Search className="size-5 text-primary" />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No technicians found
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try searching with a different technician name.
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}

          {/* Cards */}
          {!isLoading && !isError && filteredTechnicians.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {filteredTechnicians.map((tech: Technician) => {
                const isAvailable =
                  tech.status?.toLowerCase() === "available";

                return (
                  <Link
                    key={tech.id}
                    href={`/technicians/${tech.id}`}
                    className="app-card group relative overflow-hidden border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 sm:p-6"
                  >
                    {/* Profile Image */}
                    <div className="relative mx-auto w-fit">
                      {tech.profileImg ? (
                        <Image
                          src={tech.profileImg}
                          alt={tech.name}
                          width={112}
                          height={112}
                          className="size-20 rounded-xl object-cover ring-4 ring-muted transition-transform duration-300 group-hover:scale-105 sm:size-28"
                        />
                      ) : (
                        <div className="flex size-20 items-center justify-center rounded-xl bg-primary/10 text-primary ring-4 ring-muted transition-transform duration-300 group-hover:scale-105 sm:size-28">
                          <Wrench className="size-8 sm:size-10" />
                        </div>
                      )}

                      {/* Verified */}
                      <div className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm">
                        <CheckCircle2 className="size-3.5" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-5 text-center sm:mt-6">
                      <h3 className="line-clamp-1 text-sm font-bold text-foreground sm:text-base">
                        {tech.name}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Professional Technician
                      </p>
                    </div>

                    {/* Status */}
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[10px] font-semibold capitalize text-muted-foreground sm:text-xs">
                        <span
                          className={`size-1.5 rounded-full ${
                            isAvailable
                              ? "bg-green-500"
                              : "bg-muted-foreground"
                          }`}
                        />

                        {tech.status || "Unavailable"}
                      </span>
                    </div>

                    {/* View Profile */}
                    <div className="mt-5 flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                      View profile

                      <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Back Home */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Back to home
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}