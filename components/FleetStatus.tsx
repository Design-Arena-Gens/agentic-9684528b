import { useMemo } from "react";
import { useRailOpsStore, Train } from "@/lib/store";
import { classNames } from "@/lib/utils";

const typeColors: Record<Train["type"], string> = {
  "High Speed": "bg-primary-100 text-primary-700",
  Regional: "bg-amber-100 text-amber-700",
  Freight: "bg-emerald-100 text-emerald-700",
  Metro: "bg-purple-100 text-purple-700"
};

const statusHighlights: Record<Train["status"], string> = {
  "On Time": "border-emerald-200 bg-emerald-50",
  Delayed: "border-amber-200 bg-amber-50",
  Boarding: "border-primary-200 bg-primary-50",
  "Out of Service": "border-rose-200 bg-rose-50"
};

export function FleetStatus() {
  const trains = useRailOpsStore((state) => state.trains);

  const byType = useMemo(() => {
    return trains.reduce<Record<string, Train[]>>((acc, train) => {
      acc[train.type] = acc[train.type] ?? [];
      acc[train.type].push(train);
      return acc;
    }, {});
  }, [trains]);

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl">Fleet Readiness</h2>
          <p className="text-sm text-slate-500">
            Track operational health by train category.
          </p>
        </div>
        <span className="text-xs font-semibold uppercase text-slate-500">
          {trains.length} active units
        </span>
      </header>
      <div className="grid gap-3">
        {Object.entries(byType).map(([type, list]) => {
          const onTime = list.filter((train) => train.status === "On Time").length;
          const pct = Math.round((onTime / list.length) * 100);
          return (
            <article
              key={type}
              className="rounded-2xl bg-slate-50/80 p-4 ring-1 ring-inset ring-white/30"
            >
              <header className="flex items-center justify-between">
                <span
                  className={classNames(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    typeColors[type as Train["type"]]
                  )}
                >
                  {type}
                </span>
                <span className="text-xs text-slate-500">
                  {onTime}/{list.length} on schedule
                </span>
              </header>
              <div className="mt-3 flex items-center gap-3">
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-primary-700">{pct}%</span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {list.map((train) => (
                  <div
                    key={train.id}
                    className={classNames(
                      "rounded-xl border px-3 py-2 text-sm transition hover:-translate-y-0.5 hover:shadow-sm",
                      statusHighlights[train.status]
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{train.name}</span>
                      <span className="text-xs text-slate-500">{train.nextDeparture}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                      <span>{train.route.split("➜")[0]?.trim()}</span>
                      <span>{train.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
