"use client";

import { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  useForm,
  SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCategories } from "@/hooks/use-categories";
import { useCreateService } from "@/hooks/use-create-service";

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

    // Validate image type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    // Validate image size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setValue("image", file, {
      shouldValidate: true,
    });

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setValue("image", undefined);

    setImagePreview(null);
  };

  const onSubmit: SubmitHandler<ServiceForm> = (
    values
  ) => {
    mutate(values, {
      onSuccess: () => {
        toast.success(
          "Service created successfully"
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
            "Failed to create service"
        );
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl border bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold">
        Create Service
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <Input
            placeholder="Service Title"
            {...register("title")}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            rows={5}
            placeholder="Service Description"
            className="w-full rounded-md border p-3"
            {...register("description")}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <select
            {...register("categoryId")}
            className="w-full rounded-md border p-3"
          >
            <option value="">
              Select Category
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
            <p className="mt-1 text-sm text-red-500">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <Input
            type="number"
            placeholder="Price"
            {...register("price", {
              valueAsNumber: true,
            })}
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <Input
            type="number"
            placeholder="Duration (Minutes)"
            {...register("duration", {
              valueAsNumber: true,
            })}
          />

          {errors.duration && (
            <p className="mt-1 text-sm text-red-500">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Service Image */}
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
            <div className="relative mt-4 overflow-hidden rounded-xl border">
              <img
                src={imagePreview}
                alt="Service preview"
                className="h-64 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 rounded-md bg-black/70 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black"
              >
                Remove
              </button>
            </div>
          )}

          {errors.image && (
            <p className="mt-1 text-sm text-red-500">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending
            ? "Creating..."
            : "Create Service"}
        </Button>
      </form>
    </div>
  );
}