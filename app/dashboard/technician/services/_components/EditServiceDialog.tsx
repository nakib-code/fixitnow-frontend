"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Service } from "@/types/service";
import { useUpdateService } from "@/hooks/use-update-service";

interface Props {
  service: Service;
}

interface FormData {
  title: string;
  description: string;
  price: number;
  duration: number;
  image?: File;
}

export default function EditServiceDialog({
  service,
}: Props) {
  const { mutate, isPending } = useUpdateService();

  const [imagePreview, setImagePreview] =
    useState<string | null>(service.image ?? null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>();

 useEffect(() => {
  reset({
    title: service.title,
    description: service.description,
    price: Number(service.price),
    duration: service.duration,
  });
}, [service, reset]);


  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setValue("image", file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const onSubmit = (values: FormData) => {
    mutate(
      {
        id: service.id,
        payload: values,
      },
      {
        onSuccess: () => {
          toast.success(
            "Service updated successfully"
          );
        },

        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              "Failed to update service"
          );
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Service
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Title */}
          <Input
            placeholder="Title"
            {...register("title")}
          />

          {/* Description */}
          <textarea
            rows={4}
            placeholder="Description"
            className="w-full rounded-md border p-3"
            {...register("description")}
          />

          {/* Price */}
          <Input
            type="number"
            placeholder="Price"
            {...register("price", {
              valueAsNumber: true,
            })}
          />

          {/* Duration */}
          <Input
            type="number"
            placeholder="Duration (Minutes)"
            {...register("duration", {
              valueAsNumber: true,
            })}
          />

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Service Image
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG, WEBP up to 5MB
            </p>

            {imagePreview && (
              <div className="relative mt-3 h-48 w-full overflow-hidden rounded-xl border">
                <Image
                  src={imagePreview}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 500px"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending
              ? "Updating..."
              : "Update Service"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}