"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  Briefcase,
  Camera,
  Loader2,
  MapPin,
  Star,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useDistricts, useDivisions, useUpazilas } from "@/hooks/locations/use-locations";
import { useUpdateTechnicianProfile } from "@/hooks/technicians/use-update-technician-profile";

import { updateProfileImage } from "@/services/user/user.api";

import { TechnicianProfile } from "@/types/technician";

interface Props {
  profile: TechnicianProfile;
}

type FormValues = {
  bio: string;
  experience: number;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  villageOrArea: string;
  address: string;
  city: string;
  postalCode: string;
};

const ProfileForm = ({ profile }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { mutate, isPending } =
    useUpdateTechnicianProfile();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      bio: profile.bio || "",
      experience: profile.experience || 0,
      divisionId: profile.user.divisionId || "",
      districtId: profile.user.districtId || "",
      upazilaId: profile.user.upazilaId || "",
      villageOrArea: profile.user.villageOrArea || "",
      address: profile.user.address || "",
      city: profile.user.city || "",
      postalCode: profile.user.postalCode || "",
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
    reset({
      bio: profile.bio || "",
      experience: profile.experience || 0,
      divisionId: profile.user.divisionId || "",
      districtId: profile.user.districtId || "",
      upazilaId: profile.user.upazilaId || "",
      villageOrArea: profile.user.villageOrArea || "",
      address: profile.user.address || "",
      city: profile.user.city || "",
      postalCode: profile.user.postalCode || "",
    });
  }, [profile, reset]);

  const profileImage =
    selectedImage || profile.user.profileImg || "";

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    try {
      setUploading(true);

      const updatedUser = await updateProfileImage(file);

      setSelectedImage(
        updatedUser.profileImg || ""
      );

      toast.success(
        "Profile image updated successfully."
      );
    } catch (error: any) {
      console.error(
        "Profile image upload failed:",
        error
      );

      toast.error(
        error?.response?.data?.message ??
          "Failed to upload profile image."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDivisionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setValue("divisionId", value);
    setValue("districtId", "");
    setValue("upazilaId", "");
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setValue("districtId", value);
    setValue("upazilaId", "");
  };

  const handleUpazilaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(
      "upazilaId",
      event.target.value
    );
  };

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  const serviceLocation = [
    profile.user.villageOrArea,
    profile.user.upazila?.name,
    profile.user.district?.name,
    profile.user.division?.name,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="app-card overflow-hidden border-border bg-card shadow-sm">
        <div className="h-32 bg-gradient-to-r from-primary/80 to-primary sm:h-36" />

        <CardContent className="-mt-14 flex flex-col items-center px-5 pb-8 sm:-mt-16 sm:px-8">
          {/* Profile Image */}
          <div className="relative size-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg sm:size-32">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={
                  profile.user.name ||
                  "Technician"
                }
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-4xl font-bold text-muted-foreground">
                {profile.user.name
                  ?.charAt(0)
                  .toUpperCase() || "T"}
              </div>
            )}
          </div>

          {/* Hidden Image Input */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file =
                event.target.files?.[0];

              if (!file) return;

              handleImageUpload(file);
              event.target.value = "";
            }}
          />

          {/* Change Photo */}
          <Button
            type="button"
            variant="outline"
            className="mt-4 h-10 rounded-xl px-4"
            disabled={uploading}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="mr-2 size-4" />
                Change Photo
              </>
            )}
          </Button>

          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-foreground">
            {profile.user.name}
          </h2>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            {profile.user.email}
          </p>

          <Badge className="mt-4 rounded-full px-3 py-1">
            TECHNICIAN
          </Badge>
        </CardContent>
      </Card>

      {/* Technician Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Experience
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {profile.experience || 0} Years
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Rating
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {Number(
                  profile.averageRating || 0
                ).toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completed Jobs
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {profile.completedJobs || 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Profile */}
      <Card className="app-card border-border bg-card shadow-sm">
        <CardContent className="p-5 sm:p-6 md:p-8">
          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Professional Profile
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Add your professional information
              and service location.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7"
          >
            {/* Bio */}
            <div className="space-y-2">
              <label
                htmlFor="technician-bio"
                className="text-sm font-medium text-foreground"
              >
                Bio
              </label>

              <textarea
                id="technician-bio"
                rows={5}
                placeholder="Tell customers about yourself..."
                {...register("bio")}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label
                htmlFor="technician-experience"
                className="text-sm font-medium text-foreground"
              >
                Experience
              </label>

              <Input
                id="technician-experience"
                type="number"
                min={0}
                placeholder="Enter your experience"
                {...register("experience", {
                  valueAsNumber: true,
                })}
                className="rounded-xl"
              />

              <p className="text-xs text-muted-foreground">
                Enter your experience in years.
              </p>
            </div>

            {/* Service Location */}
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Service Location
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Select where you provide your
                  services.
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
                    <option
                      key={division.id}
                      value={division.id}
                    >
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
                  value={districtId}
                  onChange={handleDistrictChange}
                  disabled={
                    !divisionId ||
                    districtsLoading
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {districtsLoading
                      ? "Loading districts..."
                      : !divisionId
                        ? "Select Division First"
                        : "Select District"}
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
                  value={upazilaId}
                  onChange={handleUpazilaChange}
                  disabled={
                    !districtId ||
                    upazilasLoading
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {upazilasLoading
                      ? "Loading Upazilas..."
                      : !districtId
                        ? "Select District First"
                        : "Select Upazila / Thana"}
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
                  placeholder="e.g. Goakhola, Dhanmondi, Mirpur"
                  {...register("villageOrArea")}
                  className="rounded-xl"
                />

                <p className="text-xs leading-5 text-muted-foreground">
                  Enter your village name or city
                  area.
                </p>
              </div>
            </div>

            {/* Detailed Address */}
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Detailed Address
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Add your complete service address.
                </p>
              </div>

              {/* Address */}
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
                  placeholder="Enter your detailed address"
                  className="rounded-xl"
                />
              </div>

              {/* City + Postal Code */}
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
                    placeholder="Enter your city"
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
                    placeholder="Enter postal code"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="border-t border-border pt-5">
              <Button
                type="submit"
                disabled={
                  isPending || uploading
                }
                className="btn-primary h-11 w-full sm:w-auto"
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

      {/* Account Information */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Technician Name */}
        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Technician Name
              </p>

              <p className="mt-1 truncate font-semibold text-foreground">
                {profile.user.name}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="text-lg font-semibold">
                @
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Email Address
              </p>

              <p className="mt-1 truncate font-semibold text-foreground">
                {profile.user.email}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Location */}
        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-start gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-6" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Service Location
              </p>

              <p className="mt-1 font-semibold leading-6 text-foreground">
                {serviceLocation ||
                  "Not provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card className="app-card border-border bg-card shadow-sm">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Average Rating
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {Number(
                  profile.averageRating || 0
                ).toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Role */}
        <Card className="app-card border-border bg-card shadow-sm md:col-span-2">
          <CardContent className="flex items-center gap-4 p-5 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="size-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Account Role
              </p>

              <Badge className="mt-2 rounded-full px-3 py-1">
                TECHNICIAN
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileForm;