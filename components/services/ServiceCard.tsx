import Image from "next/image";
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
  const technician = service.technician?.user;

  const location = [
    technician?.villageOrArea,
    technician?.upazila?.name,
    technician?.district?.name,
    technician?.division?.name,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
      {/* Service Image */}
      <div className="relative h-64 w-full overflow-hidden bg-muted sm:h-72">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wrench className="size-16 text-muted-foreground/30" />
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Category */}
        {service.category && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-md backdrop-blur">
              <Wrench className="size-3.5" />
              {service.category.name}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-4 right-4">
          <span className="rounded-xl bg-primary px-4 py-2 text-lg font-bold text-primary-foreground shadow-lg">
            ৳{service.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {service.title}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {service.description}
        </p>

        {/* Technician */}
        <div className="mt-6 flex items-center gap-3">
          {technician?.profileImg ? (
            <div className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-sm">
              <Image
                src={technician.profileImg}
                alt={technician.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </div>
          )}

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Technician
            </p>

            <p className="truncate text-sm font-semibold text-foreground">
              {technician?.name || "Unknown Technician"}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-4 flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <MapPin className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Location
            </p>

            <p className="line-clamp-2 text-sm font-medium text-foreground">
              {location || "Location not provided"}
            </p>
          </div>
        </div>

        {/* View Details */}
        <div className="mt-auto pt-6">
          <Link
            href={`/services/${service.id}`}
            className="block"
          >
            <Button className="group/button h-11 w-full rounded-xl">
              View Details

              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover/button:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}