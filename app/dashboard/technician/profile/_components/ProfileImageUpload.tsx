"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

interface Props {
  onUpload: (url: string) => void;
}

export default function ProfileImageUpload({
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);

      const url = await uploadImageToCloudinary(file);

      onUpload(url);

      toast.success(
        "Profile image uploaded successfully."
      );
    } catch (error) {
      console.error(
        "Profile image upload failed:",
        error
      );

      toast.error(
        "Failed to upload profile image."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="h-10 rounded-xl px-4"
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 size-4" />
            Upload Image
          </>
        )}
      </Button>
    </div>
  );
}