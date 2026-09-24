"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/services/admin/admin.api";

import { IUser } from "@/types/user";

export const useAdminUsers = () => {
  return useQuery<IUser[]>({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });
};