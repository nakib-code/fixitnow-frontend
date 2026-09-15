"use client";

import Image from "next/image";

import {
  Pencil,
  Trash2,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Service } from "@/types/service";

import { useDeleteService } from "@/hooks/use-delete-service";

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

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Service Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wrench className="h-14 w-14 text-gray-300" />
          </div>
        )}
      </div>

      <div className="space-y-3 p-5">
        {/* Title */}
        <h2 className="text-xl font-semibold">
          {service.title}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-500">
          {service.description}
        </p>

        {/* Service Info */}
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">
              Category:
            </span>{" "}
            {service.category.name}
          </p>

          <p>
            <span className="font-medium">
              Price:
            </span>{" "}
            ৳{service.price}
          </p>

          <p>
            <span className="font-medium">
              Duration:
            </span>{" "}
            {service.duration} Minutes
          </p>

          <p>
            <span className="font-medium">
              Status:
            </span>{" "}
            <span
              className={
                service.isAvailable
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {service.isAvailable
                ? "Available"
                : "Unavailable"}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-3">
          <EditServiceDialog
            service={service}
          />

          <Button
            variant="destructive"
            className="flex-1"
            disabled={isPending}
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete this service?"
                )
              ) {
                mutate(service.id);
              }
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />

            {isPending
              ? "Deleting..."
              : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}