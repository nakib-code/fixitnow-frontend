"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  LayoutDashboard,
  Users,
  CalendarDays,
  FolderTree,
  User,
  ChevronRight,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Home",
    href: "/",
    icon: House,
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
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b px-5 py-5">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <span className="text-lg">🔧</span>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              FixItNow
            </h1>

            <p className="text-xs text-slate-500">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 p-3">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-[18px] w-[18px] ${
                    active
                      ? "text-primary-foreground"
                      : "text-slate-500 group-hover:text-slate-900"
                  }`}
                />

                <span>{item.title}</span>
              </div>

              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  active
                    ? "opacity-100"
                    : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-60"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-700">
            Admin Panel
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            Manage your service marketplace
          </p>
        </div>
      </div>
    </div>
  );
}