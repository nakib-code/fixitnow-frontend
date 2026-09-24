"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  FolderTree,
  House,
  LayoutDashboard,
  LogOut,
  User,
  Users,
  Wrench,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/dashboard/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Bookings",
    href: "/dashboard/admin/bookings",
    icon: CalendarDays,
  },
  {
    title: "Profile",
    href: "/dashboard/admin/profile",
    icon: User,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="border-b border-border px-5 py-5">
        <Link
          href="/dashboard/admin"
          className="group flex items-center gap-2.5"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
            <Wrench className="size-5" />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              FixIt<span className="text-primary">Now</span>
            </h1>

            <p className="text-xs text-muted-foreground">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-3">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Main Menu
        </p>

        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon
                  className={`size-[18px] shrink-0 transition-colors ${
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />

                <span className="truncate">
                  {item.title}
                </span>
              </div>

              <ChevronRight
                className={`size-4 shrink-0 transition-all duration-200 ${
                  active
                    ? "opacity-100"
                    : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-60"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-border p-4">
        <div className="space-y-2">
          {/* Visit Store */}
          <Link
            href="/"
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
          >
            <div className="flex items-center gap-3">
              <House className="size-[18px] transition-transform duration-200 group-hover:scale-105" />

              <span>Visit Store</span>
            </div>

            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* Logout */}
          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-[18px] transition-transform duration-200 group-hover:-translate-x-0.5" />

            <span>Logout</span>
          </button>
        </div>

        {/* Panel Info */}
        <div className="app-card mt-4 border border-border bg-muted/30 p-3">
          <p className="text-xs font-medium text-foreground">
            Admin Panel
          </p>

          <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
            Manage your service marketplace
          </p>
        </div>
      </div>
    </aside>
  );
}