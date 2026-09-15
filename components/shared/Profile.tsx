"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  updateProfileImage,
  updateUserProfile,
} from "@/services/user/user.api";

type FormValues = {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

const Profile = () => {
  const { user, isLoading, refetch } = useCurrentUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState("");

  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      postalCode: user.postalCode || "",
    });
  }, [user, reset]);

  useEffect(() => {
    if (user?.profileImg) {
      setImage(user.profileImg);
    }
  }, [user?.profileImg]);

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-60 items-center justify-center">
        User not found.
      </div>
    );
  }

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      const updatedUser = await updateProfileImage(file);

      setImage(updatedUser.profileImg || "");

      await refetch();
    } catch (error) {
      console.error("Profile image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);

      await updateUserProfile(values);

      await refetch();
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/80 to-primary" />

        <CardContent className="-mt-14 flex flex-col items-center px-8 pb-8">
          {/* Profile Image */}
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg">
            {image ? (
              <Image
                src={image}
                alt={user.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              handleImageUpload(file);

              e.target.value = "";
            }}
          />

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            disabled={uploading}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </>
            )}
          </Button>

          <h2 className="mt-4 text-2xl font-bold">
            {user.name}
          </h2>

          <p className="text-muted-foreground">
            {user.email}
          </p>

          <Badge className="mt-4">
            {user.role}
          </Badge>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Edit Profile
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <Input
                {...register("name")}
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <Input
                value={user.email}
                disabled
                className="bg-muted"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <Input
                {...register("phone")}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Address
              </label>

              <Input
                {...register("address")}
                placeholder="Enter your address"
              />
            </div>

            {/* City + Postal Code */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  City
                </label>

                <Input
                  {...register("city")}
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Postal Code
                </label>

                <Input
                  {...register("postalCode")}
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            {/* Save */}
            <Button
              type="submit"
              className="w-full"
              disabled={saving || uploading}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <User size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Full Name
              </p>

              <p className="font-semibold">
                {user.name}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Mail size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email Address
              </p>

              <p className="font-semibold">
                {user.email}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Phone size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Phone Number
              </p>

              <p className="font-semibold">
                {user.phone || "Not provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <MapPin size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Location
              </p>

              <p className="font-semibold">
                {user.city || "Not provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <ShieldCheck size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Account Role
              </p>

              <Badge className="mt-2">
                {user.role}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
