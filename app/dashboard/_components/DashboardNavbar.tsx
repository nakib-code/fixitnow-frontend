"use client";

import { Loader2, LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useLogout } from "@/hooks/auth/useLogout";

type Props = {
  onMenuClick: () => void;
};

export default function DashboardNavbar({ onMenuClick }: Props) {
  const router = useRouter();

  const { user, isLoading } = useCurrentUser();

  const { mutate: logout, isPending } = useLogout();

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
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-3 sm:px-5 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="rounded-xl md:hidden"
          >
            <Menu className="size-5" />
          </Button>

          {/* Dashboard Title */}
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
              {isLoading ? "Loading..." : dashboardTitle}
            </h1>

            <p className="hidden text-xs text-muted-foreground sm:block">
              Welcome back!
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Avatar */}
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary">
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt={userName}
                className="size-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-primary-foreground">
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="hidden min-w-0 sm:block">
            <p className="max-w-40 truncate text-sm font-medium text-foreground">
              {isLoading ? "Loading..." : userName}
            </p>

            <p className="max-w-48 truncate text-xs text-muted-foreground">
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
            className="hidden rounded-xl sm:inline-flex"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 size-4" />
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
            className="rounded-xl sm:hidden"
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <LogOut className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}