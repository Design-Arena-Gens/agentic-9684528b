import { useMemo } from "react";
import { useRailOpsStore } from "@/lib/store";
import { formatPercent } from "@/lib/utils";

const statStyles = [
  "from-primary-500 to-primary-700",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-purple-400 to-purple-600"
];

const statTitles = [
  "Fleet Availability",
  "On-Time Performance",
  "Seats Occupied",
  "Active Incidents"
];

export function QuickStats() {
  const trains = useRailOpsStore((state) => state.trains);
  const incidents = useRailOpsStore((state) => state.incidents);

  const stats = useMemo(() => {
    const totalTrains = trains.length || 1;
    const available = trains.filter((train) => train.status !== "Out of Service");
    const onTime = trains.filter((train) => train.status === "On Time");
    const totalCapacity = trains.reduce((sum, train) => sum + train.capacity, 0);
    const totalOccupancy = trains.reduce(
      (sum, train) => sum + train.occupancy,
      0
    );
    const activeIncidents = incidents.filter((incident) => !incident.resolved);

    return [
      formatPercent(available.length / totalTrains),
      formatPercent(onTime.length / totalTrains),
      formatPercent(totalOccupancy / totalCapacity),
      `${activeIncidents.length}`
    ];
  }, [trains, incidents]);

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((value, index) => (
        <article
          key={statTitles[index]}
          className={`rounded-2xl bg-gradient-to-r ${statStyles[index]} text-white shadow-lg shadow-primary-900/10`}
        >
          <div className="flex flex-col gap-2 p-4">
            <span className="text-sm font-medium uppercase tracking-wider text-white/70">
              {statTitles[index]}
            </span>
            <span className="text-3xl font-bold">{value}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
