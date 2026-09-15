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

import { useCreateCategory } from "@/hooks/use-create-category";

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
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const file = data.icon?.[0];

    mutate(
      {
        name: data.name,
        description: data.description,
        icon: file,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button className="btn-primary" />}
      >
        Add Category
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Category
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <Input
            placeholder="Category Name"
            {...register("name", {
              required: true,
            })}
          />

          {/* Icon */}
          <Input
            type="file"
            accept="image/*"
            {...register("icon")}
          />

          {/* Description */}
          <Input
            placeholder="Description (Optional)"
            {...register("description")}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="btn-primary w-full"
            disabled={isPending}
          >
            {isPending
              ? "Creating..."
              : "Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;