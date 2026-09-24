"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";

interface Props {
  src?: string | null;
  alt: string;
  size?: "sm" | "lg";
}

export default function CategoryImage({
  src,
  alt,
  size = "sm",
}: Props) {
  const [hasError, setHasError] = useState(false);

  const containerSize =
    size === "lg"
      ? "size-20"
      : "size-12 sm:size-14";

  const iconSize =
    size === "lg"
      ? "size-8"
      : "size-5 sm:size-6";

  const showFallback = !src || hasError;

  return (
    <div
      className={`flex ${containerSize} shrink-0 items-center justify-center overflow-hidden bg-primary/10`}
    >
      {showFallback ? (
        <Wrench className={`${iconSize} text-primary`} />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="size-full object-contain"
        />
      )}
    </div>
  );
}