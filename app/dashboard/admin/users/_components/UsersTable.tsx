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

import { useAdminUsers } from "@/hooks/use-admin-users";
import {
  useBlockUser,
  useUnblockUser,
} from "@/hooks/use-update-user-status";
import { useDeleteUser } from "@/hooks/use-delete-user";

import { IUser } from "@/types/user";

const UsersTable = () => {
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useAdminUsers();

  const { mutate: blockUser, isPending: isBlocking } =
    useBlockUser();

  const { mutate: unblockUser, isPending: isUnblocking } =
    useUnblockUser();

  const { mutate: deleteUser, isPending: isDeleting } =
    useDeleteUser();

  const isPending =
    isBlocking || isUnblocking || isDeleting;

  const filteredUsers = users.filter((user: IUser) => {
    const searchValue = search.toLowerCase();

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
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-muted-foreground">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="text-muted-foreground">
          Manage all users from here.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full max-w-sm rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <p className="text-sm text-muted-foreground">
          {filteredUsers.length} users
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>

              <TableHead>Email</TableHead>

              <TableHead>Phone</TableHead>

              <TableHead>Role</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user: IUser) => (
                <TableRow key={user.id}>
                  {/* Name */}
                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    {user.email}
                  </TableCell>

                  {/* Phone */}
                  <TableCell>
                    {user.phone || "N/A"}
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                      {user.role}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
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
                          onClick={() =>
                            handleDelete(user)
                          }
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
  );
};

export default UsersTable;
