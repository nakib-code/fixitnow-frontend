"use client";

import { X } from "lucide-react";

import AdminSidebar from "@/app/dashboard/admin/_components/AdminSidebar";
import CustomerSidebar from "@/app/dashboard/customer/_components/CustomerSidebar";
import TechnicianSidebar from "@/app/dashboard/technician/_components/TechnicianSidebar";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({
  open,
  onClose,
}: Props) {
  const { user, isLoading } = useCurrentUser();

  const renderSidebar = () => {
    if (isLoading) {
      return (
        <div className="p-6 text-sm text-slate-500">
          Loading...
        </div>
      );
    }

    switch (user?.role) {
      case "ADMIN":
        return <AdminSidebar />;

      case "TECHNICIAN":
        return <TechnicianSidebar />;

      case "CUSTOMER":
      default:
        return <CustomerSidebar />;
    }
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r bg-white md:block">
        {renderSidebar()}
      </aside>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              FixItNow
            </h2>

            <p className="text-xs text-slate-500">
              Dashboard
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu */}
        <div
          className="h-[calc(100vh-4rem)] overflow-y-auto"
          onClick={onClose}
        >
          {renderSidebar()}
        </div>
      </aside>
    </>
  );
}