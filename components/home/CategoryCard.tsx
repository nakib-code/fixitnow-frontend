"use client";

import Link from "next/link";

import { ICategory } from "@/types/category";
import CategoryImage from "./CategoryImage";


type Props = {
  category: ICategory;
};

export default function CategoryCard({
  category,
}: Props) {
  return (
    <Link
      href={`/services?category=${encodeURIComponent(category.id)}`}
      className="app-card group block border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex justify-center">
        <CategoryImage
          src={category.icon}
          alt={category.name}
          size="lg"
        />
      </div>

      <h3 className="mt-4 text-center text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {category.name}
      </h3>
    </Link>
  );
}