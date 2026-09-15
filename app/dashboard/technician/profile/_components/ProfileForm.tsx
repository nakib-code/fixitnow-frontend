"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TechnicianProfile } from "@/types/technician";
import { useUpdateTechnicianProfile } from "@/hooks/use-update-technician-profile";
import { updateProfileImage } from "@/services/user/user.api";

interface Props {
  profile: TechnicianProfile;
}

type FormValues = {
  bio: string;
  experience: number;
  location: string;
};

export default function ProfileForm({ profile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(profile.user.profileImg || "");

  const { mutate, isPending } = useUpdateTechnicianProfile();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      bio: profile.bio || "",
      experience: profile.experience,
      location: profile.location,
    },
  });

  useEffect(() => {
    reset({
      bio: profile.bio || "",
      experience: profile.experience,
      location: profile.location,
    });
  }, [profile, reset]);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      const updatedUser = await updateProfileImage(file);

      setImage(updatedUser.profileImg || "");
    } catch (error) {
      console.error("Profile image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border">
            {image ? (
              <Image
                src={image}
                alt="Profile"
                fill
                sizes="144px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground">
                {profile.user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

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
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
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
        </div>

        {/* Bio */}
        <div>
          <label className="mb-2 block">Bio</label>

          <textarea
            rows={5}
            className="w-full rounded-md border p-3"
            {...register("bio")}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block">Experience</label>

          <Input
            type="number"
            min={0}
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block">Location</label>

          <Input {...register("location")} />
        </div>

        {/* Save */}
        <Button
          type="submit"
          className="w-full"
          disabled={uploading || isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
