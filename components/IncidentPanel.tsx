import { useRailOpsStore } from "@/lib/store";
import { classNames } from "@/lib/utils";

export function IncidentPanel() {
  const { incidents, toggleIncidentStatus } = useRailOpsStore((state) => ({
    incidents: state.incidents,
    toggleIncidentStatus: state.toggleIncidentStatus
  }));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <header className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg sm:text-xl">Incident Hotline</h2>
          <p className="text-sm text-slate-500">
            Monitor and resolve operational reports from crews.
          </p>
        </div>
        <span className="text-xs font-semibold uppercase text-slate-500">
          {incidents.length} logged
        </span>
      </header>
      <div className="mt-4 space-y-3 text-sm">
        {incidents.map((incident) => (
          <article
            key={incident.id}
            className={classNames(
              "flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm transition hover:border-primary-200 sm:flex-row sm:items-center sm:justify-between",
              incident.resolved ? "opacity-75" : ""
            )}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs uppercase text-slate-500">
                <span>{incident.reportedAt}</span>
                <span className="font-semibold text-primary-600">
                  Train {incident.trainId}
                </span>
              </div>
              <p className="font-medium text-slate-700">{incident.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleIncidentStatus(incident.id)}
              className={classNames(
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition",
                incident.resolved
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  : "bg-amber-500 text-white hover:bg-amber-400"
              )}
            >
              {incident.resolved ? "Reopen" : "Resolve"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
