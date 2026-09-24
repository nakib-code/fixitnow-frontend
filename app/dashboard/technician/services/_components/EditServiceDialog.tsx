"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { useUpdateService } from "@/hooks/services/use-update-service";

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

  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<
    string | null
  >(service.image ?? null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      title: service.title,
      description: service.description,
      price: Number(service.price),
      duration: service.duration,
    },
  });

  useEffect(() => {
    reset({
      title: service.title,
      description: service.description,
      price: Number(service.price),
      duration: service.duration,
    });

    setImagePreview(service.image ?? null);
  }, [service, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    setValue("image", file, {
      shouldDirty: true,
    });

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
            "Service updated successfully."
          );

          setOpen(false);
        },

        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              "Failed to update service."
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-10 flex-1 rounded-xl px-4 font-medium"
          />
        }
      >
        Edit
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-2xl sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Service
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="edit-service-title"
              className="text-sm font-medium text-foreground"
            >
              Service Title
            </label>

            <Input
              id="edit-service-title"
              placeholder="e.g. Home Plumbing Repair"
              {...register("title")}
              className="rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="edit-service-description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>

            <textarea
              id="edit-service-description"
              rows={5}
              placeholder="Describe your service..."
              {...register("description")}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label
              htmlFor="edit-service-price"
              className="text-sm font-medium text-foreground"
            >
              Price
            </label>

            <Input
              id="edit-service-price"
              type="number"
              min="1"
              placeholder="e.g. 500"
              {...register("price", {
                valueAsNumber: true,
              })}
              className="rounded-xl"
            />

            <p className="text-xs text-muted-foreground">
              Enter the service price in BDT.
            </p>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label
              htmlFor="edit-service-duration"
              className="text-sm font-medium text-foreground"
            >
              Duration
            </label>

            <Input
              id="edit-service-duration"
              type="number"
              min="1"
              placeholder="e.g. 60"
              {...register("duration", {
                valueAsNumber: true,
              })}
              className="rounded-xl"
            />

            <p className="text-xs text-muted-foreground">
              Duration in minutes.
            </p>
          </div>

          {/* Image */}
          <div className="space-y-3">
            <div>
              <label
                htmlFor="edit-service-image"
                className="text-sm font-medium text-foreground"
              >
                Service Image
              </label>

              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG or WEBP. Maximum file size 5MB.
              </p>
            </div>

            <Input
              id="edit-service-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer rounded-xl"
            />

            {imagePreview && (
              <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={imagePreview}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover"
                  unoptimized={imagePreview.startsWith("blob:")}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="border-t border-border pt-5">
            <Button
              type="submit"
              disabled={isPending}
              className="btn-primary h-11 w-full"
            >
              {isPending
                ? "Updating..."
                : "Update Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}