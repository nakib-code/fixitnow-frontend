"use client";

import {
  Banknote,
  CalendarCheck,
  FolderOpen,
  User,
  UserCog,
  Users,
} from "lucide-react";

import { useAdminBookings } from "@/hooks/use-admin-bookings";
import { useAdminCategories } from "@/hooks/use-admin-categories";
import { useAdminUsers } from "@/hooks/use-admin-users";

import DashboardCard from "@/components/admin/dashboard/DashboardCard";

type UserData = {
  role: string;
};

type BookingData = {
  payment?: {
    amount?: number | string | null;
  } | null;
};

const AdminDashboard = () => {
  const {
    data: users = [],
    isLoading: usersLoading,
  } = useAdminUsers();

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
  } = useAdminBookings();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useAdminCategories();

  const isLoading =
    usersLoading ||
    bookingsLoading ||
    categoriesLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-slate-200" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-slate-200" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-xl border bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  const userList = users as UserData[];
  const bookingList = bookings as BookingData[];

  // Statistics
  const totalUsers = userList.length;

  const totalCustomers = userList.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

  const totalTechnicians = userList.filter(
    (user) => user.role === "TECHNICIAN"
  ).length;

  const totalBookings = bookingList.length;

  const totalCategories = categories.length;

  const totalRevenue = bookingList.reduce(
    (sum, booking) => {
      return (
        sum +
        Number(booking.payment?.amount ?? 0)
      );
    },
    0
  );

  const formattedRevenue =
    `৳ ${totalRevenue.toLocaleString("en-BD")}`;

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Welcome back! Here&apos;s an overview of your platform.
          </p>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="h-6 w-6" />}
        />

        <DashboardCard
          title="Customers"
          value={totalCustomers}
          icon={<User className="h-6 w-6" />}
        />

        <DashboardCard
          title="Technicians"
          value={totalTechnicians}
          icon={<UserCog className="h-6 w-6" />}
        />

        <DashboardCard
          title="Bookings"
          value={totalBookings}
          icon={<CalendarCheck className="h-6 w-6" />}
        />

        <DashboardCard
          title="Categories"
          value={totalCategories}
          icon={<FolderOpen className="h-6 w-6" />}
        />

        <DashboardCard
          title="Revenue"
          value={formattedRevenue}
          icon={<Banknote className="h-6 w-6" />}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;