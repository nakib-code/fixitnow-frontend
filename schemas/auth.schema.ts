import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    role: z.enum(["CUSTOMER", "TECHNICIAN"]),

    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name is too long"),

    email: z.email("Please enter a valid email"),

    // Location
    divisionId: z.string().optional(),
    districtId: z.string().optional(),
    upazilaId: z.string().optional(),

    villageOrArea: z
      .string()
      .max(100, "Village or area is too long")
      .optional()
      .or(z.literal("")),

    address: z
      .string()
      .max(255, "Address is too long")
      .optional()
      .or(z.literal("")),

    city: z
      .string()
      .max(100, "City is too long")
      .optional()
      .or(z.literal("")),

    postalCode: z
      .string()
      .max(20, "Postal code is too long")
      .optional()
      .or(z.literal("")),

    // Technician information
    bio: z
      .string()
      .max(500, "Bio must be 500 characters or less")
      .optional()
      .or(z.literal("")),

    experience: z
      .number()
      .min(0, "Experience cannot be negative")
      .max(60, "Please enter a valid experience")
      .optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }

    if (data.role === "TECHNICIAN") {
      if (!data.divisionId) {
        ctx.addIssue({
          code: "custom",
          path: ["divisionId"],
          message: "Division is required",
        });
      }

      if (!data.districtId) {
        ctx.addIssue({
          code: "custom",
          path: ["districtId"],
          message: "District is required",
        });
      }

      if (!data.upazilaId) {
        ctx.addIssue({
          code: "custom",
          path: ["upazilaId"],
          message: "Upazila is required",
        });
      }

      if (!data.address) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message: "Full address is required",
        });
      }

      if (data.experience === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["experience"],
          message: "Experience is required",
        });
      }
    }
  });

export type RegisterValues = z.infer<typeof registerSchema>;