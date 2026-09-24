"use client";

import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/categories/use-categories";
import { ICategory } from "@/types/category";

export default function ServicesFilter() {
  const { data: categories = [] } = useCategories();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentSearch = searchParams.get("search") ?? "";

      if (search === currentSearch) return;

      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      const query = params.toString();

      router.replace(
        query ? `${pathname}?${query}` : pathname
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, searchParams, pathname, router]);

  const handleCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (e.target.value) {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }

    const query = params.toString();

    router.replace(
      query ? `${pathname}?${query}` : pathname
    );
  };

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-xl border-border bg-background pl-10 pr-4 text-sm shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>

        {/* Category */}
        <div className="relative sm:w-56">
          <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

          <select
            value={searchParams.get("category") ?? ""}
            onChange={handleCategory}
            className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition-colors hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All Categories</option>

            {categories.map((category: ICategory) => (
              <option
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Active Filter Info */}
      {(search || searchParams.get("category")) && (
        <div className="mt-3 flex items-center gap-2 px-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />

          <span>
            {searchParams.get("category")
              ? `Filtered by ${searchParams.get("category")}`
              : "Searching services"}
          </span>
        </div>
      )}
    </div>
  );
}