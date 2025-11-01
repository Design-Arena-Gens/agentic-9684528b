"use client";

import { useState } from "react";
import {
  Train,
  useRailOpsStore,
  MaintenanceLevel,
  Route
} from "@/lib/store";
import { classNames } from "@/lib/utils";

type PanelTab = "schedule" | "train" | "maintenance";

const defaultTrain: Omit<Train, "id"> = {
  name: "",
  type: "High Speed",
  status: "On Time",
  route: "",
  nextDeparture: "",
  platform: "",
  capacity: 200,
  occupancy: 0,
  driver: "",
  lastMaintained: "",
  maintenanceStatus: "Routine"
};

const defaultRoute: Omit<Route, "id"> = {
  name: "",
  origin: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  platform: "",
  line: ""
};

const defaultMaintenance = {
  title: "",
  severity: "Routine" as MaintenanceLevel,
  trainId: "",
  dueDate: "",
  assignedTo: ""
};

const tabs: Array<{ id: PanelTab; label: string }> = [
  { id: "schedule", label: "Add Schedule" },
  { id: "train", label: "Register Train" },
  { id: "maintenance", label: "Maintenance Task" }
];

export function OperationsPanel() {
  const [activeTab, setActiveTab] = useState<PanelTab>("schedule");
  const addTrain = useRailOpsStore((state) => state.addTrain);
  const addSchedule = useRailOpsStore((state) => state.addSchedule);
  const addMaintenance = useRailOpsStore((state) => state.addMaintenance);
  const trains = useRailOpsStore((state) => state.trains);

  const [newTrain, setNewTrain] = useState(defaultTrain);
  const [newRoute, setNewRoute] = useState(defaultRoute);
  const [newMaintenance, setNewMaintenance] = useState(defaultMaintenance);
  const [successMessage, setSuccessMessage] = useState("");

  const handleToast = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
          Operations cockpit
        </span>
        <h2 className="text-lg sm:text-xl">Command Center</h2>
        <p className="text-sm text-slate-500">
          Create schedules, register trains, and coordinate maintenance in real-time.
        </p>
      </header>
      <nav className="mt-4 flex rounded-full bg-slate-100 p-1 text-sm font-semibold text-slate-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              "flex-1 rounded-full px-3 py-2 transition",
              activeTab === tab.id
                ? "bg-white text-neutral-900 shadow-sm"
                : "hover:text-neutral-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="mt-4 space-y-4">
        {successMessage && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}
        {activeTab === "schedule" && (
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              addSchedule({
                ...newRoute,
                name: `${newRoute.origin} ➜ ${newRoute.destination}`
              });
              setNewRoute(defaultRoute);
              handleToast("New route scheduled and added to departures.");
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Origin
                <input
                  required
                  value={newRoute.origin}
                  onChange={(event) =>
                    setNewRoute((prev) => ({ ...prev, origin: event.target.value }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="Aurora Central"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Destination
                <input
                  required
                  value={newRoute.destination}
                  onChange={(event) =>
                    setNewRoute((prev) => ({
                      ...prev,
                      destination: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="Meridian Hub"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Departure Time
                <input
                  required
                  value={newRoute.departureTime}
                  onChange={(event) =>
                    setNewRoute((prev) => ({
                      ...prev,
                      departureTime: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="06:45"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Arrival Time
                <input
                  required
                  value={newRoute.arrivalTime}
                  onChange={(event) =>
                    setNewRoute((prev) => ({
                      ...prev,
                      arrivalTime: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="08:05"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Platform
                <input
                  required
                  value={newRoute.platform}
                  onChange={(event) =>
                    setNewRoute((prev) => ({
                      ...prev,
                      platform: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="7A"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Line
                <input
                  required
                  value={newRoute.line}
                  onChange={(event) =>
                    setNewRoute((prev) => ({ ...prev, line: event.target.value }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="Blue"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500"
            >
              Schedule Route
            </button>
          </form>
        )}
        {activeTab === "train" && (
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              addTrain(newTrain);
              setNewTrain(defaultTrain);
              handleToast("Train registered and assigned to fleet.");
            }}
          >
            <label className="flex flex-col gap-1 text-sm">
              Train Name
              <input
                required
                value={newTrain.name}
                onChange={(event) =>
                  setNewTrain((prev) => ({ ...prev, name: event.target.value }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2"
                placeholder="Aurora Express II"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Train Type
                <select
                  value={newTrain.type}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      type: event.target.value as Train["type"]
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                >
                  <option value="High Speed">High Speed</option>
                  <option value="Regional">Regional</option>
                  <option value="Freight">Freight</option>
                  <option value="Metro">Metro</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Status
                <select
                  value={newTrain.status}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      status: event.target.value as Train["status"]
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                >
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Boarding">Boarding</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm">
              Assigned Route
              <input
                required
                value={newTrain.route}
                onChange={(event) =>
                  setNewTrain((prev) => ({ ...prev, route: event.target.value }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2"
                placeholder="Aurora Central ➜ Meridian Hub"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Departure Time
                <input
                  required
                  value={newTrain.nextDeparture}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      nextDeparture: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="17:20"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Platform
                <input
                  required
                  value={newTrain.platform}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      platform: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                  placeholder="4C"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Capacity
                <input
                  required
                  type="number"
                  min={0}
                  value={newTrain.capacity}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      capacity: Number(event.target.value)
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Occupancy
                <input
                  required
                  type="number"
                  min={0}
                  value={newTrain.occupancy}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      occupancy: Number(event.target.value)
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm">
              Driver
              <input
                required
                value={newTrain.driver}
                onChange={(event) =>
                  setNewTrain((prev) => ({ ...prev, driver: event.target.value }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2"
                placeholder="E. Winters"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Last Maintained
                <input
                  required
                  type="date"
                  value={newTrain.lastMaintained}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      lastMaintained: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Maintenance Status
                <select
                  value={newTrain.maintenanceStatus}
                  onChange={(event) =>
                    setNewTrain((prev) => ({
                      ...prev,
                      maintenanceStatus: event.target.value as Train["maintenanceStatus"]
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                >
                  <option value="Routine">Routine</option>
                  <option value="Critical">Critical</option>
                  <option value="Inspection">Inspection</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-700"
            >
              Register Train
            </button>
          </form>
        )}
        {activeTab === "maintenance" && (
          <form
            className="grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              addMaintenance(newMaintenance);
              setNewMaintenance(defaultMaintenance);
              handleToast("Maintenance task queued for depot assignment.");
            }}
          >
            <label className="flex flex-col gap-1 text-sm">
              Task Title
              <input
                required
                value={newMaintenance.title}
                onChange={(event) =>
                  setNewMaintenance((prev) => ({
                    ...prev,
                    title: event.target.value
                  }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2"
                placeholder="Diagnostic Inspection"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Train
              <select
                required
                value={newMaintenance.trainId}
                onChange={(event) =>
                  setNewMaintenance((prev) => ({
                    ...prev,
                    trainId: event.target.value
                  }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2"
              >
                <option value="">Select train</option>
                {trains.map((train) => (
                  <option key={train.id} value={train.id}>
                    {train.id} — {train.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                Severity
                <select
                  value={newMaintenance.severity}
                  onChange={(event) =>
                    setNewMaintenance((prev) => ({
                      ...prev,
                      severity: event.target.value as MaintenanceLevel
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                >
                  <option value="Routine">Routine</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Critical">Critical</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Due Date
                <input
                  required
                  type="date"
                  value={newMaintenance.dueDate}
                  onChange={(event) =>
                    setNewMaintenance((prev) => ({
                      ...prev,
                      dueDate: event.target.value
                    }))
                  }
                  className="rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm">
              Assigned Depot
              <input
                required
                value={newMaintenance.assignedTo}
                onChange={(event) =>
                  setNewMaintenance((prev) => ({
                    ...prev,
                    assignedTo: event.target.value
                  }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2"
                placeholder="Depot Bravo"
              />
            </label>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
            >
              Queue Maintenance Task
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
