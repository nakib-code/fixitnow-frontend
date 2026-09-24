"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth/auth.api";

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,

    retry: false,

    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    user,
    isLoading,
    isError,
    refetch,
  };
};