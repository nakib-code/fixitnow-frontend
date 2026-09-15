"use client";

import {
  Loader2,
  LogOut,
  Menu,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useLogout } from "@/hooks/useLogout";

type Props = {
  onMenuClick: () => void;
};

export default function DashboardNavbar({
  onMenuClick,
}: Props) {
  const router = useRouter();

  const { user, isLoading } = useCurrentUser();

  const {
    mutate: logout,
    isPending,
  } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful");

        router.replace("/auth/login");
        router.refresh();
      },
    });
  };

  const dashboardTitle = (() => {
    switch (user?.role) {
      case "ADMIN":
        return "Admin Dashboard";

      case "TECHNICIAN":
        return "Technician Dashboard";

      case "CUSTOMER":
        return "Customer Dashboard";

      default:
        return "Dashboard";
    }
  })();

  const userName = user?.name ?? "User";

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-3 sm:px-5 lg:px-8">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
              {isLoading
                ? "Loading..."
                : dashboardTitle}
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Welcome back!
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Avatar */}
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-primary">
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt={userName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary-foreground">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User info */}
          <div className="hidden sm:block">
            <p className="max-w-40 truncate text-sm font-medium">
              {isLoading
                ? "Loading..."
                : userName}
            </p>

            <p className="max-w-48 truncate text-xs text-slate-500">
              {user?.email ?? ""}
            </p>
          </div>

          {/* Desktop Logout */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            disabled={isPending}
            className="hidden sm:inline-flex"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>

          {/* Mobile Logout */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            disabled={isPending}
            className="sm:hidden"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
