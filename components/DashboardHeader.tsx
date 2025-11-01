"use client";

import { useState } from "react";
import { classNames } from "@/lib/utils";

const quickFilters = [
  { id: "all", label: "All Fleets" },
  { id: "high-speed", label: "High Speed" },
  { id: "regional", label: "Regional" },
  { id: "metro", label: "Metro" },
  { id: "freight", label: "Freight" }
];

export function DashboardHeader() {
  const [filter, setFilter] = useState("all");

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
          RailOps Command
        </span>
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Central Train Management
        </h1>
        <p className="text-sm text-slate-500 sm:text-base">
          Coordinate fleet operations, live schedules, and maintenance readiness across
          your national rail network.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex rounded-full bg-slate-100 p-1 text-sm text-slate-600">
          {quickFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={classNames(
                "rounded-full px-3 py-2 font-semibold transition",
                item.id === filter
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "hover:bg-white hover:text-neutral-900"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-700 active:translate-y-0.5"
        >
          Export Daily Manifest
        </button>
      </div>
    </header>
  );
}
