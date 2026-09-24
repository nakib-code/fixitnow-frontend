"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Briefcase,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  User,
  Wrench,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard/technician",
    icon: LayoutDashboard,
  },
  {
    title: "My Services",
    href: "/dashboard/technician/services",
    icon: Briefcase,
  },
  {
    title: "Create Service",
    href: "/dashboard/technician/create-services",
    icon: PlusCircle,
  },
  {
    title: "Requests",
    href: "/dashboard/technician/requests",
    icon: CalendarDays,
  },
  {
    title: "Profile",
    href: "/dashboard/technician/profile",
    icon: User,
  },
];

export default function TechnicianSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
      {/* Logo */}
      <div className="shrink-0 border-b border-border p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
            <Wrench className="size-5 text-primary-foreground" />
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            FixIt<span className="text-primary">Now</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-[18px]" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="shrink-0 border-t border-border p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
        >
          <Wrench className="size-[18px]" />
          <span>Visit Store</span>
        </Link>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/10"
        >
          <LogOut className="size-[18px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}