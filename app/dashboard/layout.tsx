"use client";

import { ReactNode, useState } from "react";

import DashboardNavbar from "./_components/DashboardNavbar";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNavbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="min-h-[calc(100vh-7rem)] rounded-xl border bg-white p-4 shadow-sm sm:p-5 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}