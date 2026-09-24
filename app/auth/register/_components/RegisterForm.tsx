"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Loader2,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  registerSchema,
  type RegisterValues,
} from "@/schemas/auth.schema";

import { registerUser } from "@/services/auth/auth.api";

import {
  useDistricts,
  useDivisions,
  useUpazilas,
} from "@/services/location/location.api";

type AccountRole = "CUSTOMER" | "TECHNICIAN";

const getErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
  ) {
    return String(error.response.data.message);
  }

  return "Unable to register. Please try again.";
};

export default function RegisterForm() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] =
    useState<AccountRole | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      role: "CUSTOMER",

      name: "",
      email: "",

      divisionId: "",
      districtId: "",
      upazilaId: "",

      villageOrArea: "",
      address: "",
      city: "",
      postalCode: "",

      bio: "",
      experience: undefined,

      password: "",
      confirmPassword: "",
    },
  });

  const divisionId = watch("divisionId");
  const districtId = watch("districtId");

  const {
    data: divisions = [],
    isLoading: divisionsLoading,
  } = useDivisions();

  const {
    data: districts = [],
    isLoading: districtsLoading,
  } = useDistricts(divisionId);

  const {
    data: upazilas = [],
    isLoading: upazilasLoading,
  } = useUpazilas(districtId);

  useEffect(() => {
    setValue("districtId", "");
    setValue("upazilaId", "");
  }, [divisionId, setValue]);

  useEffect(() => {
    setValue("upazilaId", "");
  }, [districtId, setValue]);

  const handleRoleSelect = (role: AccountRole) => {
    setSelectedRole(role);

    reset({
      role,

      name: "",
      email: "",

      divisionId: "",
      districtId: "",
      upazilaId: "",

      villageOrArea: "",
      address: "",
      city: "",
      postalCode: "",

      bio: "",
      experience: undefined,

      password: "",
      confirmPassword: "",
    });
  };

  const handleChangeRole = () => {
    setSelectedRole(null);

    reset({
      role: "CUSTOMER",

      name: "",
      email: "",

      divisionId: "",
      districtId: "",
      upazilaId: "",

      villageOrArea: "",
      address: "",
      city: "",
      postalCode: "",

      bio: "",
      experience: undefined,

      password: "",
      confirmPassword: "",
    });
  };

  const onSubmit = async (values: RegisterValues) => {
    if (!selectedRole) {
      toast.error("Please select an account type.");
      return;
    }

    try {
      setLoading(true);

      const payload: RegisterValues = {
        ...values,
        role: selectedRole,
      };

      const response = await registerUser(payload);

      toast.success(
        response.message || "Registration successful",
      );

      router.push("/auth/login");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Account Type Selection
  // --------------------------------

  if (!selectedRole) {
    return (
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <Wrench className="size-7" />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Choose how you want to use{" "}
              <span className="font-semibold text-primary">
                FixItNow
              </span>
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Customer */}
            <button
              type="button"
              onClick={() => handleRoleSelect("CUSTOMER")}
              className="group rounded-2xl border border-border bg-background p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserRound className="size-6" />
                </div>

                <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-foreground">
                Customer
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Book trusted technicians and manage your home
                service requests.
              </p>
            </button>

            {/* Technician */}
            <button
              type="button"
              onClick={() => handleRoleSelect("TECHNICIAN")}
              className="group rounded-2xl border border-border bg-background p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BriefcaseBusiness className="size-6" />
                </div>

                <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-foreground">
                Technician
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Offer your professional services and manage
                customer bookings.
              </p>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  const isTechnician = selectedRole === "TECHNICIAN";

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleChangeRole}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <ArrowLeft className="size-4" />
            Change account type
          </button>

          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            {isTechnician ? (
              <BriefcaseBusiness className="size-3.5" />
            ) : (
              <UserRound className="size-3.5" />
            )}

            {isTechnician ? "Technician" : "Customer"}
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {isTechnician
              ? "Create your technician account"
              : "Create your customer account"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {isTechnician
              ? "Tell us about yourself and your professional experience."
              : "Create your account to book trusted home services."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-8"
          noValidate
        >
          {/* Personal Information */}
          <section className="space-y-5">
            <SectionHeader
              icon={<UserRound className="size-4" />}
              title="Personal Information"
              description="Basic information about your account"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Full Name"
                htmlFor="name"
                error={errors.name?.message}
                required
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={loading}
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                  className="h-11 rounded-xl bg-background"
                />
              </FormField>

              <FormField
                label="Email"
                htmlFor="email"
                error={errors.email?.message}
                required
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                  className="h-11 rounded-xl bg-background"
                />
              </FormField>
            </div>
          </section>

          {/* Technician Professional Information */}
          {isTechnician && (
            <section className="space-y-5">
              <SectionHeader
                icon={<BriefcaseBusiness className="size-4" />}
                title="Professional Information"
                description="Information about your professional experience"
              />

              <FormField
                label="Experience"
                htmlFor="experience"
                error={errors.experience?.message}
                required
              >
                <div className="relative">
                  <Input
                    id="experience"
                    type="number"
                    min={0}
                    max={60}
                    placeholder="e.g. 3"
                    disabled={loading}
                    aria-invalid={Boolean(errors.experience)}
                    {...register("experience", {
                      setValueAs: (value) =>
                        value === ""
                          ? undefined
                          : Number(value),
                    })}
                    className="h-11 rounded-xl bg-background pr-20"
                  />

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    years
                  </span>
                </div>
              </FormField>

              <FormField
                label="Short Bio"
                htmlFor="bio"
                error={errors.bio?.message}
              >
                <textarea
                  id="bio"
                  placeholder="Briefly describe your professional experience..."
                  disabled={loading}
                  aria-invalid={Boolean(errors.bio)}
                  {...register("bio")}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormField>
            </section>
          )}

          {/* Location */}
          <section className="space-y-5">
            <SectionHeader
              icon={<MapPin className="size-4" />}
              title="Location"
              description={
                isTechnician
                  ? "Required location information for your service area"
                  : "Optional location information"
              }
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Division */}
              <FormField
                label="Division"
                htmlFor="divisionId"
                error={errors.divisionId?.message}
                required={isTechnician}
              >
                <select
                  id="divisionId"
                  disabled={loading || divisionsLoading}
                  aria-invalid={Boolean(errors.divisionId)}
                  {...register("divisionId")}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {divisionsLoading
                      ? "Loading divisions..."
                      : "Select division"}
                  </option>

                  {divisions.map((division) => (
                    <option
                      key={division.id}
                      value={division.id}
                    >
                      {division.name}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* District */}
              <FormField
                label="District"
                htmlFor="districtId"
                error={errors.districtId?.message}
                required={isTechnician}
              >
                <select
                  id="districtId"
                  disabled={
                    loading ||
                    !divisionId ||
                    districtsLoading
                  }
                  aria-invalid={Boolean(errors.districtId)}
                  {...register("districtId")}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {districtsLoading
                      ? "Loading districts..."
                      : "Select district"}
                  </option>

                  {districts.map((district) => (
                    <option
                      key={district.id}
                      value={district.id}
                    >
                      {district.name}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Upazila */}
              <FormField
                label="Upazila"
                htmlFor="upazilaId"
                error={errors.upazilaId?.message}
                required={isTechnician}
              >
                <select
                  id="upazilaId"
                  disabled={
                    loading ||
                    !districtId ||
                    upazilasLoading
                  }
                  aria-invalid={Boolean(errors.upazilaId)}
                  {...register("upazilaId")}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {upazilasLoading
                      ? "Loading upazilas..."
                      : "Select upazila"}
                  </option>

                  {upazilas.map((upazila) => (
                    <option
                      key={upazila.id}
                      value={upazila.id}
                    >
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </FormField>

              {/* Village / Area */}
              <FormField
                label="Village / Area"
                htmlFor="villageOrArea"
                error={errors.villageOrArea?.message}
              >
                <Input
                  id="villageOrArea"
                  type="text"
                  placeholder="e.g. Shantinagar"
                  disabled={loading}
                  {...register("villageOrArea")}
                  className="h-11 rounded-xl bg-background"
                />
              </FormField>

              {/* City */}
              <FormField
                label="City"
                htmlFor="city"
                error={errors.city?.message}
              >
                <Input
                  id="city"
                  type="text"
                  placeholder="e.g. Dhaka"
                  disabled={loading}
                  {...register("city")}
                  className="h-11 rounded-xl bg-background"
                />
              </FormField>

              {/* Postal Code */}
              <FormField
                label="Postal Code"
                htmlFor="postalCode"
                error={errors.postalCode?.message}
              >
                <Input
                  id="postalCode"
                  type="text"
                  placeholder="e.g. 1205"
                  disabled={loading}
                  {...register("postalCode")}
                  className="h-11 rounded-xl bg-background"
                />
              </FormField>

              {/* Address */}
              <div className="sm:col-span-2">
                <FormField
                  label="Full Address"
                  htmlFor="address"
                  error={errors.address?.message}
                  required={isTechnician}
                >
                  <textarea
                    id="address"
                    placeholder="House, road, area..."
                    disabled={loading}
                    aria-invalid={Boolean(errors.address)}
                    {...register("address")}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormField>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="space-y-5">
            <SectionHeader
              icon={<Wrench className="size-4" />}
              title="Account Security"
              description="Keep your account secure with a strong password"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Password */}
              <FormField
                label="Password"
                htmlFor="password"
                error={errors.password?.message}
                required
              >
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={loading}
                    aria-invalid={Boolean(errors.password)}
                    {...register("password")}
                    className="h-11 rounded-xl bg-background pr-11"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="size-[18px]" />
                    ) : (
                      <Eye className="size-[18px]" />
                    )}
                  </button>
                </div>
              </FormField>

              {/* Confirm Password */}
              <FormField
                label="Confirm Password"
                htmlFor="confirmPassword"
                error={errors.confirmPassword?.message}
                required
              >
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={loading}
                    aria-invalid={Boolean(
                      errors.confirmPassword,
                    )}
                    {...register("confirmPassword")}
                    className="h-11 rounded-xl bg-background pr-11"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev,
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-[18px]" />
                    ) : (
                      <Eye className="size-[18px]" />
                    )}
                  </button>
                </div>
              </FormField>
            </div>
          </section>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create{" "}
                {isTechnician ? "Technician" : "Customer"}{" "}
                Account
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <h2 className="font-semibold text-foreground">
          {title}
        </h2>

        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  error,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-foreground"
      >
        {label}

        {required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </label>

      {children}

      {error && (
        <p
          role="alert"
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}