"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import {
  useDivisions,
  useDistricts,
  useUpazilas,
} from "@/hooks/locations/use-locations";
import { useUpdateUserProfile } from "@/hooks/user/use-update-user-profile";
import { updateProfileImage } from "@/services/user/user.api";

type FormValues = {
  name: string;
  phone: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  villageOrArea: string;
  address: string;
  city: string;
  postalCode: string;
};

export default function Profile() {
  const { user, isLoading } = useCurrentUser();
  const { mutate, isPending } = useUpdateUserProfile();

  const [profileImage, setProfileImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      divisionId: "",
      districtId: "",
      upazilaId: "",
      villageOrArea: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const divisionId = watch("divisionId");
  const districtId = watch("districtId");
  const upazilaId = watch("upazilaId");

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
    if (!user) return;

    reset({
      name: user.name || "",
      phone: user.phone || "",
      divisionId: user.divisionId || "",
      districtId: user.districtId || "",
      upazilaId: user.upazilaId || "",
      villageOrArea: user.villageOrArea || "",
      address: user.address || "",
      city: user.city || "",
      postalCode: user.postalCode || "",
    });

    setProfileImage(user.profileImg || "");
  }, [user, reset]);

  const handleDivisionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setValue("divisionId", value);
    setValue("districtId", "");
    setValue("upazilaId", "");
  };

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setValue("districtId", value);
    setValue("upazilaId", "");
  };

  const handleUpazilaChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue("upazilaId", e.target.value);
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setImageUploading(true);

      const updatedUser = await updateProfileImage(file);

      setProfileImage(updatedUser.profileImg || "");
    } catch (error) {
      console.error("Profile image upload failed:", error);
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-7 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-card py-20 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          User profile not found.
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  const locationText = [
    user.villageOrArea,
    user.upazila?.name,
    user.district?.name,
    user.division?.name,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Profile Header */}
      <Card className="app-card border-border bg-card shadow-sm">
        <CardContent className="flex flex-col items-center gap-5 p-6 sm:flex-row">
          {/* Profile Image */}
          <div className="relative shrink-0">
            <div className="size-24 overflow-hidden rounded-full border border-border bg-muted">
              <img
                src={profileImage || "/images/default-avatar.png"}
                alt={user.name || "Profile"}
                className="size-full object-cover"
              />
            </div>

            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              {imageUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={imageUploading}
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* User Info */}
          <div className="min-w-0 text-center sm:text-left">
            <h2 className="truncate text-2xl font-bold tracking-tight text-foreground">
              {user.name}
            </h2>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {user.email}
            </p>

            <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase text-primary">
              {user.role}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card className="app-card border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7"
          >
            {/* Name + Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="profile-name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>

                <Input
                  id="profile-name"
                  {...register("name")}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="profile-phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone
                </label>

                <Input
                  id="profile-phone"
                  {...register("phone")}
                  placeholder="01XXXXXXXXX"
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="profile-email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>

              <Input
                id="profile-email"
                value={user.email || ""}
                disabled
                className="rounded-xl bg-muted"
              />
            </div>

            {/* Location */}
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Location
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Select your location to help us find nearby
                  services and technicians.
                </p>
              </div>

              {/* Division */}
              <div className="space-y-2">
                <label
                  htmlFor="division"
                  className="text-sm font-medium text-foreground"
                >
                  Division
                </label>

                <select
                  id="division"
                  {...register("divisionId")}
                  value={divisionId}
                  onChange={handleDivisionChange}
                  disabled={divisionsLoading}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {divisionsLoading
                      ? "Loading divisions..."
                      : "Select Division"}
                  </option>

                  {divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label
                  htmlFor="district"
                  className="text-sm font-medium text-foreground"
                >
                  District
                </label>

                <select
                  id="district"
                  {...register("districtId")}
                  value={districtId}
                  onChange={handleDistrictChange}
                  disabled={!divisionId || districtsLoading}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {districtsLoading
                      ? "Loading districts..."
                      : "Select District"}
                  </option>

                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label
                  htmlFor="upazila"
                  className="text-sm font-medium text-foreground"
                >
                  Upazila / Thana
                </label>

                <select
                  id="upazila"
                  {...register("upazilaId")}
                  value={upazilaId}
                  onChange={handleUpazilaChange}
                  disabled={!districtId || upazilasLoading}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {upazilasLoading
                      ? "Loading upazilas..."
                      : "Select Upazila / Thana"}
                  </option>

                  {upazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.id}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Village / Area */}
              <div className="space-y-2">
                <label
                  htmlFor="village-area"
                  className="text-sm font-medium text-foreground"
                >
                  Village / Area
                </label>

                <Input
                  id="village-area"
                  {...register("villageOrArea")}
                  placeholder="e.g. Goakhola, Mirpur, Dhanmondi"
                  className="rounded-xl"
                />

                <p className="text-xs leading-5 text-muted-foreground">
                  Village for rural areas, or area/neighborhood
                  for city users.
                </p>
              </div>
            </div>

            {/* Detailed Address */}
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Detailed Address
                </h3>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-foreground"
                >
                  Address
                </label>

                <Input
                  id="address"
                  {...register("address")}
                  placeholder="House, road, building, etc."
                  className="rounded-xl"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-foreground"
                  >
                    City
                  </label>

                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="e.g. Dhaka"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="postal-code"
                    className="text-sm font-medium text-foreground"
                  >
                    Postal Code
                  </label>

                  <Input
                    id="postal-code"
                    {...register("postalCode")}
                    placeholder="e.g. 1207"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-border pt-5">
              <Button
                type="submit"
                disabled={isPending}
                className="btn-primary"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card className="app-card border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Current Location
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            {locationText || "Location not set"}
          </p>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="app-card border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Account Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Role
            </p>

            <p className="mt-1 font-medium text-foreground">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Account Status
            </p>

            <p className="mt-1 font-medium text-foreground">
              {user.status}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}