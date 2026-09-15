"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAdminCategories } from "@/hooks/use-admin-categories";

import CreateCategoryDialog from "./CreateCategoryDialog";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

const CategoriesTable = () => {
  const { data: categories = [], isLoading } = useAdminCategories();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Category Management
          </h1>

          <p className="text-muted-foreground">
            Manage all service categories.
          </p>
        </div>

        <CreateCategoryDialog />
      </div>

      {/* Empty State */}
      {!categories.length ? (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-2xl font-bold">
            No Categories Found
          </h2>

          <p className="mt-2 text-muted-foreground">
            Create your first category.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border">
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
                  <TableCell className="font-medium">
                    {category.name}
                  </TableCell>

                  <TableCell>
                    {category.icon ? (
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>
                    {category.description || "-"}
                  </TableCell>

                  <TableCell>
                    {category.createdAt
                      ? new Date(
                          category.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <UpdateCategoryDialog
                        category={category}
                      />

                      <DeleteCategoryDialog
                        id={category.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;