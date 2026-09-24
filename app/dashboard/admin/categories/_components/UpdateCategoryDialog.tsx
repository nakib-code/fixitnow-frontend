"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useUpdateCategory } from "@/hooks/categories/use-update-category";

type Category = {
  id: string;
  name: string;
  icon?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type Props = {
  category?: Category;
};

type FormValues = {
  name: string;
  icon?: FileList;
  description?: string;
};

const UpdateCategoryDialog = ({ category }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!open || !category) {
      return;
    }

    reset({
      name: category.name,
      description: category.description ?? "",
    });
  }, [open, category, reset]);

  const onSubmit = (data: FormValues) => {
    if (!category) {
      return;
    }

    const file = data.icon?.[0];

    mutate(
      {
        id: category.id,
        payload: {
          name: data.name.trim(),
          description: data.description?.trim(),
          icon: file,
        },
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };

  if (!category) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-9 rounded-xl px-4 font-medium"
          />
        }
      >
        Edit
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor={`category-name-${category.id}`}
              className="text-sm font-medium text-foreground"
            >
              Category Name
            </label>

            <Input
              id={`category-name-${category.id}`}
              placeholder="e.g. Plumbing"
              {...register("name", {
                required: "Category name is required",
                validate: (value) =>
                  value.trim().length > 0 || "Category name is required",
              })}
            />

            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Current Image */}
          {category.icon && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Current Image
              </p>

              <div className="flex size-20 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="size-full object-cover"
                />
              </div>
            </div>
          )}

          {/* New Image */}
          <div className="space-y-2">
            <label
              htmlFor={`category-icon-${category.id}`}
              className="text-sm font-medium text-foreground"
            >
              {category.icon ? "Replace Image" : "Category Image"}
            </label>

            <Input
              id={`category-icon-${category.id}`}
              type="file"
              accept="image/*"
              {...register("icon")}
              className="cursor-pointer"
            />

            <p className="text-xs text-muted-foreground">
              {category.icon
                ? "Leave empty to keep the current image."
                : "Upload an image for this category."}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor={`category-description-${category.id}`}
              className="text-sm font-medium text-foreground"
            >
              Description
              <span className="ml-1 text-muted-foreground">(Optional)</span>
            </label>

            <textarea
              id={`category-description-${category.id}`}
              placeholder="Write a short description..."
              rows={4}
              {...register("description")}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;
