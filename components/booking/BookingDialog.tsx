"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCreateBooking } from "@/hooks/bookings/use-create-booking";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const bookingSchema = z
  .object({
    bookingDate: z.string().min(1, "Booking date is required"),

    startTime: z.string().min(1, "Start time is required"),

    endTime: z.string().min(1, "End time is required"),

    address: z
      .string()
      .min(5, "Address is required")
      .max(200, "Address must be less than 200 characters"),

    note: z
      .string()
      .max(300, "Note must be less than 300 characters")
      .optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    path: ["endTime"],
    message: "End time must be after start time",
  });

type BookingForm = z.infer<typeof bookingSchema>;

interface Props {
  serviceId: string;
}

export default function BookingDialog({ serviceId }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateBooking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      bookingDate: "",
      startTime: "",
      endTime: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = (values: BookingForm) => {
    mutate(
      {
        serviceId,
        ...values,
      },
      {
        onSuccess: () => {
          toast.success("Booking created successfully");

          reset();
          setOpen(false);

          router.push("/dashboard/customer/bookings");
        },

        onError: (error: any) => {
          toast.error(error?.response?.data?.message ?? "Booking failed");
        },
      },
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Book Now Button */}
      <DialogTrigger className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 active:translate-y-0 sm:w-auto">
        Book Now
      </DialogTrigger>

      {/* Booking Dialog */}
      <DialogContent className="w-[calc(100%-2rem)] rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Booking Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Booking Date
            </label>

            <Input
              type="date"
              min={today}
              className="h-11 rounded-xl"
              {...register("bookingDate")}
            />

            {errors.bookingDate?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bookingDate.message}
              </p>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Start Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Start Time
              </label>

              <Input
                type="time"
                className="h-11 rounded-xl"
                {...register("startTime")}
              />

              {errors.startTime?.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                End Time
              </label>

              <Input
                type="time"
                className="h-11 rounded-xl"
                {...register("endTime")}
              />

              {errors.endTime?.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Service Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Service Address
            </label>

            <Input
              type="text"
              placeholder="House No, Road, Area, District"
              className="h-11 rounded-xl"
              {...register("address")}
            />

            {errors.address?.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Special Instructions */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Special Instructions{" "}
              <span className="font-normal text-muted-foreground">
                (Optional)
              </span>
            </label>

            <textarea
              rows={4}
              maxLength={300}
              placeholder="Example: Please call before arriving."
              className="w-full resize-none rounded-xl border border-input bg-background p-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register("note")}
            />

            <div className="mt-1 flex items-center justify-between">
              <div>
                {errors.note?.message && (
                  <p className="text-sm text-red-500">{errors.note.message}</p>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Max 300 characters
              </p>
            </div>
          </div>

          {/* Confirm Booking */}
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
