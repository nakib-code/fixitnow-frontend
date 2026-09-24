"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateReview } from "@/hooks/reviews/use-create-review";

const reviewSchema = z.object({
  rating: z.number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),

  comment: z.string().optional(),
});

type ReviewForm = z.infer<typeof reviewSchema>;

interface Props {
  bookingId: string;
}

export default function ReviewDialog({
  bookingId,
}: Props) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } =
    useCreateReview();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = (values: ReviewForm) => {
    mutate(
      {
        bookingId,
        ...values,
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
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
          Leave Review
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Review Service
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Rating (1 - 5)
            </label>

            <Input
              type="number"
              min={1}
              max={5}
              {...register("rating", {
                valueAsNumber: true,
              })}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.rating?.message}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Comment
            </label>

            <textarea
              rows={4}
              className="w-full rounded-md border p-3"
              placeholder="Write your experience..."
              {...register("comment")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.comment?.message}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending
              ? "Submitting..."
              : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}