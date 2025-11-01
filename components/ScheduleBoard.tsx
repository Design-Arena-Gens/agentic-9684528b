import { useMemo } from "react";
import { useRailOpsStore } from "@/lib/store";
import { classNames } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "On Time": "text-emerald-600 bg-emerald-100/70",
  Delayed: "text-amber-600 bg-amber-100/70",
  Boarding: "text-primary-700 bg-primary-100/70",
  "Out of Service": "text-rose-600 bg-rose-100/70"
};

export function ScheduleBoard() {
  const trains = useRailOpsStore((state) => state.trains);
  const routes = useRailOpsStore((state) => state.routes);

  const merged = useMemo(() => {
    return routes.map((route) => {
      const match = trains.find((train) => train.route === route.name);
      return {
        ...route,
        status: match?.status ?? "Scheduled",
        trainName: match?.name ?? "Unassigned",
        occupancy: match
          ? Math.round((match.occupancy / match.capacity) * 100)
          : null
      };
    });
  }, [trains, routes]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <header className="flex items-baseline justify-between pb-3">
        <div>
          <h2 className="text-lg sm:text-xl">Live Departure Board</h2>
          <p className="text-sm text-slate-500">
            Prioritized by departure time and operational status.
          </p>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:inline-block">
          Updated 2 min ago
        </span>
      </header>
      <div className="overflow-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="rounded-l-2xl bg-slate-50 px-4 py-2">Departure</th>
              <th className="bg-slate-50 px-4 py-2">Route</th>
              <th className="bg-slate-50 px-4 py-2">Train</th>
              <th className="hidden bg-slate-50 px-4 py-2 sm:table-cell">Line</th>
              <th className="bg-slate-50 px-4 py-2">Platform</th>
              <th className="hidden bg-slate-50 px-4 py-2 lg:table-cell">Occupancy</th>
              <th className="rounded-r-2xl bg-slate-50 px-4 py-2 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {merged.map((row) => (
              <tr key={row.id} className="text-sm text-slate-700">
                <td className="rounded-l-2xl bg-white px-4 py-3 font-semibold">
                  <span>{row.departureTime}</span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Arr {row.arrivalTime}
                  </span>
                </td>
                <td className="bg-white px-4 py-3">
                  <div className="font-medium">{row.origin}</div>
                  <div className="text-xs text-slate-500">{row.destination}</div>
                </td>
                <td className="bg-white px-4 py-3">
                  <div className="font-medium">{row.trainName}</div>
                  <div className="text-xs text-slate-500">
                    {row.trainName === "Unassigned"
                      ? "Awaiting assignment"
                      : "Crew ready"}
                  </div>
                </td>
                <td className="hidden bg-white px-4 py-3 text-xs text-slate-500 sm:table-cell">
                  {row.line}
                </td>
                <td className="bg-white px-4 py-3 font-medium">{row.platform}</td>
                <td className="hidden bg-white px-4 py-3 lg:table-cell">
                  {row.occupancy !== null ? (
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{row.occupancy}%</span>
                        <span>{row.occupancy! >= 85 ? "Monitor" : "Optimal"}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={classNames(
                            "h-full rounded-full",
                            row.occupancy! > 85
                              ? "bg-amber-500"
                              : row.occupancy! > 60
                              ? "bg-primary-500"
                              : "bg-emerald-500"
                          )}
                          style={{ width: `${row.occupancy}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
                <td className="rounded-r-2xl bg-white px-4 py-3 text-right">
                  <span
                    className={classNames(
                      "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold",
                      statusStyles[row.status] ?? "bg-slate-100 text-slate-500"
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
