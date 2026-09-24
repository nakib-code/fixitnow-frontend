"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wrench } from "lucide-react";

import { useAdminCategories } from "@/hooks/admin/use-admin-categories";

import CreateCategoryDialog from "./CreateCategoryDialog";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

const CategoriesTable = () => {
  const { data: categories = [], isLoading } = useAdminCategories();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="h-10 w-36 animate-pulse rounded-xl bg-muted" />
        </div>

        <div className="app-card overflow-hidden border border-border bg-card">
          <div className="space-y-4 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-10 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Category Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage all service categories.
          </p>
        </div>

        <CreateCategoryDialog />
      </div>

      {/* Empty State */}
      {!categories.length ? (
        <div className="app-card border border-border bg-card p-10 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wrench className="size-5" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-foreground">
            No Categories Found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first category to get started.
          </p>

          <div className="mt-5 flex justify-center">
            <CreateCategoryDialog />
          </div>
        </div>
      ) : (
        /* Categories Table */
        <div className="app-card overflow-hidden border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    {/* Name */}
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    {/* Icon */}
                    <TableCell>
                      <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
                        {category.icon ? (
                          <img
                            src={category.icon}
                            alt={category.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <Wrench className="size-5 text-primary" />
                        )}
                      </div>
                    </TableCell>

                    {/* Description */}
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm text-muted-foreground">
                        {category.description || "No description"}
                      </p>
                    </TableCell>

                    {/* Created */}
                    <TableCell className="whitespace-nowrap">
                      {category.createdAt
                        ? new Date(
                            category.createdAt
                          ).toLocaleDateString("en-BD")
                        : "-"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <UpdateCategoryDialog category={category} />

                        <DeleteCategoryDialog id={category.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;