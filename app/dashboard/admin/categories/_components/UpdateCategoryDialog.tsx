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

import { useUpdateCategory } from "@/hooks/use-update-category";

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
          name: data.name,
          description: data.description,
          icon: file,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      }
    );
  };

  if (!category) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button className="btn-outline" />}
      >
        Edit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            placeholder="Category Name"
            {...register("name", {
              required: true,
            })}
          />

          {category.icon && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Current Icon
              </p>

              <img
                src={category.icon}
                alt={category.name}
                className="h-16 w-16 rounded-md object-cover"
              />
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            {...register("icon")}
          />

          <Input
            placeholder="Description"
            {...register("description")}
          />

          <Button
            type="submit"
            className="btn-primary w-full"
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