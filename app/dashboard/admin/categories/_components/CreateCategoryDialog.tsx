"use client";

import { useState } from "react";
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

import { useCreateCategory } from "@/hooks/categories/use-create-category";

type FormValues = {
  name: string;
  icon?: FileList;
  description?: string;
};

const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const file = data.icon?.[0];

    mutate(
      {
        name: data.name.trim(),
        description: data.description?.trim(),
        icon: file,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };

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
        Add Category
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="category-name"
              className="text-sm font-medium text-foreground"
            >
              Category Name
            </label>

            <Input
              id="category-name"
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

          {/* Icon */}
          <div className="space-y-2">
            <label
              htmlFor="category-icon"
              className="text-sm font-medium text-foreground"
            >
              Category Image
            </label>

            <Input
              id="category-icon"
              type="file"
              accept="image/*"
              {...register("icon")}
              className="cursor-pointer"
            />

            <p className="text-xs text-muted-foreground">
              Upload an image for this category.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="category-description"
              className="text-sm font-medium text-foreground"
            >
              Description
              <span className="ml-1 text-muted-foreground">(Optional)</span>
            </label>

            <textarea
              id="category-description"
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
            {isPending ? "Creating..." : "Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
