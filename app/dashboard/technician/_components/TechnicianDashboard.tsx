"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Briefcase,
  CalendarCheck,
  CheckCircle,
  Clock3,
  LoaderCircle,
  Wrench,
} from "lucide-react";

import {
  getMyServices,
  getTechnicianBookings,
} from "@/services/services/service.api";

import RecentBookings from "@/app/dashboard/technician/_components/RecentBookings";
import RecentServices from "@/app/dashboard/technician/_components/RecentServices";

import DashboardCard from "@/components/admin/dashboard/DashboardCard";

import type { Service } from "@/types/service";
import { TechnicianBooking } from "@/types/technician";

const TechnicianDashboard = () => {
  const {
    data: services = [],
    isLoading: servicesLoading,
  } = useQuery<Service[]>({
    queryKey: ["my-services"],
    queryFn: getMyServices,
  });

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
  } = useQuery<TechnicianBooking[]>({
    queryKey: ["technician-bookings"],
    queryFn: getTechnicianBookings,
  });

  if (servicesLoading || bookingsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle className="size-7 animate-spin text-primary" />
      </div>
    );
  }

  const totalServices = services.length;

  const availableServices = services.filter(
    (service) => service.isAvailable
  ).length;

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "REQUESTED"
  ).length;

  const inProgressBookings = bookings.filter(
    (booking) => booking.status === "IN_PROGRESS"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  const recentBookings = bookings.slice(0, 5);
  const recentServices = services.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome Back
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Total Services"
          value={totalServices}
          icon={<Briefcase size={28} />}
        />

        <DashboardCard
          title="Available Services"
          value={availableServices}
          icon={<Wrench size={28} />}
        />

        <DashboardCard
          title="Total Bookings"
          value={totalBookings}
          icon={<CalendarCheck size={28} />}
        />

        <DashboardCard
          title="Pending Jobs"
          value={pendingBookings}
          icon={<Clock3 size={28} />}
        />

        <DashboardCard
          title="In Progress"
          value={inProgressBookings}
          icon={<LoaderCircle size={28} />}
        />

        <DashboardCard
          title="Completed Jobs"
          value={completedBookings}
          icon={<CheckCircle size={28} />}
        />
      </div>

      {/* Recent Bookings */}
      <RecentBookings bookings={recentBookings} />

      {/* Recent Services */}
      <RecentServices services={recentServices} />
    </div>
  );
};

export default TechnicianDashboard;