"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { QuickStats } from "@/components/QuickStats";
import { ScheduleBoard } from "@/components/ScheduleBoard";
import { FleetStatus } from "@/components/FleetStatus";
import { OperationsPanel } from "@/components/OperationsPanel";
import { MaintenanceBoard } from "@/components/MaintenanceBoard";
import { IncidentPanel } from "@/components/IncidentPanel";
import { MobileNav } from "@/components/MobileNav";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col gap-6 bg-gradient-to-br from-[#f3f7ff] via-white to-[#f7f9ff] px-4 pb-24 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <DashboardHeader />
        <QuickStats />
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <ScheduleBoard />
            <FleetStatus />
          </div>
          <div className="space-y-6 xl:col-span-4">
            <OperationsPanel />
            <MaintenanceBoard />
            <IncidentPanel />
          </div>
        </div>
      </div>
      <MobileNav />
    </main>
  );
}
