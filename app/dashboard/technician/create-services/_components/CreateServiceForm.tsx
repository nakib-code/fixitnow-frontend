"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

import { useCategories } from "@/hooks/categories/use-categories";
import { useCreateService } from "@/hooks/services/use-create-service";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ICategory } from "@/types/category";

const serviceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  categoryId: z
    .string()
    .min(1, "Category is required"),

  price: z
    .number()
    .min(1, "Price is required"),

  duration: z
    .number()
    .min(1, "Duration is required"),

  image: z
    .instanceof(File)
    .optional(),
});

type ServiceForm = z.infer<typeof serviceSchema>;

export default function CreateServiceForm() {
  const router = useRouter();

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useCategories();

  const {
    mutate,
    isPending,
  } = useCreateService();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {
      errors,
    },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),

    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      price: 0,
      duration: 0,
    },
  });

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

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
      shouldValidate: true,
      shouldDirty: true,
    });

    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setValue("image", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setImagePreview(null);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit: SubmitHandler<ServiceForm> = (
    values
  ) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(
          "Service created successfully."
        );

        reset();
        setImagePreview(null);

        router.push(
          "/dashboard/technician/services"
        );
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ??
            "Failed to create service."
        );
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="app-card border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Create Service
          </h1>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Add a new service that customers can book.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="service-title"
              className="text-sm font-medium text-foreground"
            >
              Service Title
            </label>

            <Input
              id="service-title"
              placeholder="e.g. Home Plumbing Repair"
              {...register("title")}
              className="rounded-xl"
            />

            {errors.title && (
              <p className="text-xs text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="service-description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </label>

            <textarea
              id="service-description"
              rows={5}
              placeholder="Describe your service..."
              {...register("description")}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
            />

            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label
              htmlFor="service-category"
              className="text-sm font-medium text-foreground"
            >
              Category
            </label>

            <select
              id="service-category"
              {...register("categoryId")}
              disabled={categoriesLoading}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select Category"}
              </option>

              {categories.map(
                (category: ICategory) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            {errors.categoryId && (
              <p className="text-xs text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Price & Duration */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="service-price"
                className="text-sm font-medium text-foreground"
              >
                Price
              </label>

              <Input
                id="service-price"
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

              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="service-duration"
                className="text-sm font-medium text-foreground"
              >
                Duration
              </label>

              <Input
                id="service-duration"
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

              {errors.duration && (
                <p className="text-xs text-destructive">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          {/* Service Image */}
          <div className="space-y-3">
            <div>
              <label
                htmlFor="service-image"
                className="text-sm font-medium text-foreground"
              >
                Service Image
              </label>

              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG or WEBP. Maximum file size 5MB.
              </p>
            </div>

            <Input
              id="service-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer rounded-xl"
            />

            {imagePreview && (
              <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src={imagePreview}
                  alt="Service preview"
                  className="h-64 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-xl bg-black/70 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
                >
                  <X className="size-4" />
                  Remove
                </button>
              </div>
            )}

            {errors.image && (
              <p className="text-xs text-destructive">
                {errors.image.message}
              </p>
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
                ? "Creating..."
                : "Create Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}