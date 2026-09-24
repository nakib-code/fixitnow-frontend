"use client";

import Link from "next/link";
import { Eye, EyeOff, Loader2, Wrench } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginValues } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/use-login";

export default function LoginForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await mutateAsync(values);

      toast.success(response.message || "Login successful");

      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Unable to login. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
          <Wrench className="size-7" />
        </div>
      </div>

      {/* Heading */}
      <div className="mt-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue to{" "}
          <span className="font-semibold text-primary">FixItNow</span>
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
        noValidate
      >
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isPending}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
            className="h-11 rounded-xl bg-background transition-colors focus-visible:ring-2 focus-visible:ring-primary/30"
          />

          {errors.email && (
            <p
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            Password
          </label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isPending}
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
              className="h-11 rounded-xl bg-background pr-11 transition-colors focus-visible:ring-2 focus-visible:ring-primary/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isPending}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" />
              ) : (
                <Eye className="size-[18px]" />
              )}
            </button>
          </div>

          {errors.password && (
            <p
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full rounded-xl bg-primary font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
