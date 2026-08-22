import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Wrench className="size-8 animate-pulse" />
        </div>

        {/* Brand */}
        <h1 className="mt-5 text-xl font-bold tracking-tight text-foreground">
          FixIt<span className="text-primary">Now</span>
        </h1>

        {/* Loading */}
        <div className="mt-5 flex items-center gap-2">
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-primary" />
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          Getting things ready...
        </p>
      </div>
    </main>
  );
}