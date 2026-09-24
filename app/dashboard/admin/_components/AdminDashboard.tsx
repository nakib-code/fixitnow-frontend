"use client";

import {
  Banknote,
  CalendarCheck,
  FolderOpen,
  User,
  UserCog,
  Users,
} from "lucide-react";

import DashboardCard from "@/components/admin/dashboard/DashboardCard";

import { useAdminBookings } from "@/hooks/admin/use-admin-bookings";
import { useAdminCategories } from "@/hooks/admin/use-admin-categories";
import { useAdminUsers } from "@/hooks/admin/use-admin-users";

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

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted sm:h-9" />

          <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-muted" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="app-card h-40 animate-pulse bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================= DATA ================= */

  const userList = users as UserData[];
  const bookingList = bookings as BookingData[];

  /* ================= STATISTICS ================= */

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
      return sum + Number(booking.payment?.amount ?? 0);
    },
    0
  );

  const formattedRevenue = `৳ ${totalRevenue.toLocaleString("en-BD")}`;

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Welcome back! Here&apos;s an overview of your platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="size-6" />}
        />

        <DashboardCard
          title="Customers"
          value={totalCustomers}
          icon={<User className="size-6" />}
        />

        <DashboardCard
          title="Technicians"
          value={totalTechnicians}
          icon={<UserCog className="size-6" />}
        />

        <DashboardCard
          title="Bookings"
          value={totalBookings}
          icon={<CalendarCheck className="size-6" />}
        />

        <DashboardCard
          title="Categories"
          value={totalCategories}
          icon={<FolderOpen className="size-6" />}
        />

        <DashboardCard
          title="Revenue"
          value={formattedRevenue}
          icon={<Banknote className="size-6" />}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;