"use client";

import { useState } from "react";
import { classNames } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "schedule", label: "Departures", icon: "🕒" },
  { id: "fleet", label: "Fleet", icon: "🚆" },
  { id: "maintenance", label: "Service", icon: "🛠️" }
];

export function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-2 shadow-lg shadow-primary-900/5 backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-1 text-xs font-semibold text-slate-500">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={classNames(
              "flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition",
              active === item.id ? "bg-primary-50 text-primary-600" : "hover:bg-slate-100"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
