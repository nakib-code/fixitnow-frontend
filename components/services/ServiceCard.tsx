import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
      {/* Top */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Wrench className="size-3.5" />
          {service.category.name}
        </span>

        <span className="text-lg font-bold text-primary">
          ৳{service.price}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {service.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {service.description}
        </p>

        {/* Technician */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="size-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Technician
              </p>

              <p className="truncate text-sm font-medium text-foreground">
                {service.technician.user.name}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <MapPin className="size-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Location
              </p>

              <p className="truncate text-sm font-medium text-foreground">
                {service.technician.location}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto pt-6">
          <Link
            href={`/services/${service.id}`}
            className="block"
          >
            <Button
              className="group/button h-11 w-full rounded-xl"
            >
              View Details

              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover/button:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}