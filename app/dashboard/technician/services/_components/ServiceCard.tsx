"use client";

import Image from "next/image";
import { Trash2, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Service } from "@/types/service";
import { useDeleteService } from "@/hooks/services/use-delete-service";

import EditServiceDialog from "@/app/dashboard/technician/services/_components/EditServiceDialog";

interface Props {
  service: Service;
}

export default function ServiceCard({
  service,
}: Props) {
  const {
    mutate,
    isPending,
  } = useDeleteService();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    mutate(service.id);
  };

  return (
    <div className="app-card group overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Service Image */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wrench className="size-14 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Title */}
        <div>
          <h2 className="line-clamp-1 text-xl font-semibold tracking-tight text-foreground">
            {service.title}
          </h2>

          <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
            {service.description}
          </p>
        </div>

        {/* Service Info */}
        <div className="space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              Category
            </span>

            <span className="truncate font-medium text-foreground">
              {service.category?.name || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              Price
            </span>

            <span className="font-semibold text-foreground">
              ৳{Number(service.price).toLocaleString("en-BD")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              Duration
            </span>

            <span className="font-medium text-foreground">
              {service.duration} min
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              Status
            </span>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                service.isAvailable
                  ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
              }`}
            >
              {service.isAvailable
                ? "Available"
                : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-border pt-4">
          <EditServiceDialog service={service} />

          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
            className="h-10 flex-1 rounded-xl font-medium"
          >
            <Trash2 className="mr-2 size-4" />

            {isPending
              ? "Deleting..."
              : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}