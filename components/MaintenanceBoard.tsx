import { useRailOpsStore } from "@/lib/store";

const severityAccent = {
  Critical: "border-rose-200 bg-rose-50 text-rose-700",
  Routine: "border-primary-200 bg-primary-50 text-primary-700",
  Inspection: "border-amber-200 bg-amber-50 text-amber-700"
};

export function MaintenanceBoard() {
  const { maintenance, completeMaintenance } = useRailOpsStore((state) => ({
    maintenance: state.maintenance,
    completeMaintenance: state.completeMaintenance
  }));

  const priorityOrder = ["Critical", "Inspection", "Routine"] as const;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <header className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg sm:text-xl">Maintenance Control</h2>
          <p className="text-sm text-slate-500">
            Resolve tasks to keep the fleet operational.
          </p>
        </div>
        <span className="text-xs font-semibold uppercase text-slate-500">
          {maintenance.length} tasks
        </span>
      </header>
      <div className="mt-4 space-y-3">
        {maintenance
          .slice()
          .sort((a, b) => {
            return (
              priorityOrder.indexOf(a.severity) - priorityOrder.indexOf(b.severity)
            );
          })
          .map((task) => (
            <article
              key={task.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm transition hover:border-primary-200 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {task.title}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Train {task.trainId}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${severityAccent[task.severity]}`}
                  >
                    {task.severity}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Due {task.dueDate}</span>
                  <span>Depot {task.assignedTo}</span>
                  <span>Status: {task.status}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => completeMaintenance(task.id)}
                className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-700 active:translate-y-0.5"
              >
                Mark Complete
              </button>
            </article>
          ))}
      </div>
    </section>
  );
}
