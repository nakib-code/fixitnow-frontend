"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAdminUsers } from "@/hooks/admin/use-admin-users";
import {
  useBlockUser,
  useUnblockUser,
} from "@/hooks/user/use-update-user-status";
import { useDeleteUser } from "@/hooks/auth/use-delete-user";

import { IUser } from "@/types/user";

const UsersTable = () => {
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useAdminUsers();

  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } =
    useUnblockUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const isPending = isBlocking || isUnblocking || isDeleting;

  const filteredUsers = users.filter((user: IUser) => {
    const searchValue = search.toLowerCase().trim();

    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.role.toLowerCase().includes(searchValue)
    );
  });

  const handleDelete = (user: IUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) return;

    deleteUser(user.id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          User Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage all users from here.
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full max-w-sm rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
        />

        <p className="text-sm text-muted-foreground">
          {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "user" : "users"}
        </p>
      </div>

      {/* Table */}
      <div className="app-card overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user: IUser) => (
                  <TableRow key={user.id}>
                    {/* Name */}
                    <TableCell className="font-medium text-foreground">
                      {user.name}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="text-muted-foreground">
                      {user.phone || "N/A"}
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {user.role}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      {user.role !== "ADMIN" && (
                        <div className="flex justify-end gap-2">
                          {/* Block / Unblock */}
                          <Button
                            size="sm"
                            variant={
                              user.status === "ACTIVE"
                                ? "destructive"
                                : "default"
                            }
                            disabled={isPending}
                            onClick={() => {
                              if (user.status === "ACTIVE") {
                                blockUser(user.id);
                              } else {
                                unblockUser(user.id);
                              }
                            }}
                            className="rounded-xl"
                          >
                            {user.status === "ACTIVE"
                              ? "Block"
                              : "Unblock"}
                          </Button>

                          {/* Delete */}
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => handleDelete(user)}
                            className="rounded-xl"
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;