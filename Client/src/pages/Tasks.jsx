import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import PageTransition from "../components/common/PageTransition";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Progress from "../components/ui/Progress";
import EmptyState from "../components/common/EmptyState";
import { TasksService } from "../services/tasks.service";
import { isoToday } from "../utils/date";
import { Clock, Calendar } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [completing, setCompleting] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    reminderTime: "09:00",
    frequency: "daily",
    startDate: isoToday(),
    endDate: isoToday(),
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await TasksService.list(); // backend returns array
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.friendlyMessage || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const validTasks = tasks.filter(Boolean);

    const completed = validTasks.filter(
      (t) =>
        t.status === "completed" ||
        t.progress?.completedDays >= t.progress?.totalDays,
    ).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }, [tasks]);

  const create = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await TasksService.create(form);
      toast.success("Task created");
      setForm((s) => ({ ...s, title: "", description: "" }));
      await fetchAll();
    } catch (e2) {
      toast.error(e2.friendlyMessage || "Create failed");
    } finally {
      setCreating(false);
    }
  };

  const completeToday = async (id) => {
    setCompleting(id);
    try {
      const res = await TasksService.complete(id);

      toast.success(res.message);

      setTasks((prev) => prev.map((t) => (t._id === id ? res.task : t)));
    } catch (e) {
      toast.error(e.friendlyMessage || "Complete failed");
    } finally {
      setCompleting(null);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setDeleting(id);

    try {
      const res = await TasksService.delete(id);

      toast.success(res.message);

      setTasks((prev) => prev.filter((t) => t && t._id !== id));
    } catch (e) {
      toast.error("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-[rgb(var(--text-main))]">
            Tasks <span className="grad-text">Planner</span>
          </h1>
          <p className="mt-2 text-md text-[rgb(var(--text-main))]">
            Create reminders with start/end dates and frequency.
          </p>
        </div>

        <Card>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div className="min-w-0">
              <p className="text-lg text-[rgb(var(--text-main))]">Completion</p>
              <p className="mt-1  font-semibold text-3xl text-[rgb(var(--text-main))]">
                {stats.completed}/{stats.total} completed
              </p>
              <div className="mt-3">
                <Progress value={stats.pct} />
                <p className="mt-2 text-sm text-[rgb(var(--text-main))]">
                  {stats.pct}%
                </p>
              </div>
            </div>

            <form
              onSubmit={create}
              className="w-full lg:max-w-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <div className="lg:col-span-3 text-[rgb(var(--text-main))]">
                <Input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="lg:col-span-3">
                <Input
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, description: e.target.value }))
                  }
                />
              </div>

              {/* <Input
                type="time"
                className="text-[rgb(var(--text-main))]"
                value={form.reminderTime}
                onChange={(e) =>
                  setForm((s) => ({ ...s, reminderTime: e.target.value }))
                }
                required
              />
              <Select
                value={form.frequency}
                onChange={(e) =>
                  setForm((s) => ({ ...s, frequency: e.target.value }))
                }
              >
                <option value="once">Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((s) => ({ ...s, startDate: e.target.value }))
                }
                required
              />
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm((s) => ({ ...s, endDate: e.target.value }))
                }
                required
                className="md:col-span-2 lg:col-span-1"
              /> */}
              <div className="relative group">
                <Input
                  type="time"
                  value={form.reminderTime}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, reminderTime: e.target.value }))
                  }
                  required
                  className="
      w-full pl-10 pr-4 py-2.5
      rounded-xl
      bg-[rgb(var(--bg-card))]
      border border-[rgb(var(--border-color))]
      text-[rgb(var(--text-main))]
      transition-all duration-200

      focus:ring-2 focus:ring-orange-500/40
      focus:border-orange-500
      group-hover:border-orange-400
    "
                />
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
              </div>

              {/* FREQUENCY */}
              <div className="relative">
                <Select
                  value={form.frequency}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, frequency: e.target.value }))
                  }
                  className="
      w-full pl-4 pr-8 py-2.5
      rounded-xl
      bg-[rgb(var(--bg-card))]
      border border-[rgb(var(--border-color))]
      text-[rgb(var(--text-main))]
      appearance-none
      transition-all duration-200

      focus:ring-2 focus:ring-orange-500/40
      focus:border-orange-500
      hover:border-orange-400
    "
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Select>

                {/* Custom arrow */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* START DATE */}
              <div className="relative group">
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, startDate: e.target.value }))
                  }
                  required
                  className="
      w-full pl-10 pr-4 py-2.5
      rounded-xl
      bg-[rgb(var(--bg-card))]
      border border-[rgb(var(--border-color))]
      text-[rgb(var(--text-main))]
      transition-all duration-200

      focus:ring-2 focus:ring-orange-500/40
      focus:border-orange-500
      group-hover:border-orange-400
    "
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
              </div>

              {/* END DATE */}
              <div className="relative group md:col-span-2 lg:col-span-1">
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, endDate: e.target.value }))
                  }
                  required
                  className="
      w-full pl-10 pr-4 py-2.5
      rounded-xl
      bg-[rgb(var(--bg-card))]
      border border-[rgb(var(--border-color))]
      text-[rgb(var(--text-main))]
      transition-all duration-200

      focus:ring-2 focus:ring-orange-500/40
      focus:border-orange-500
      group-hover:border-orange-400
    "
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
              </div>
              <Button
                type="submit"
                loading={creating}
                className="md:col-span-2 lg:col-span-3"
              >
                Create Task
              </Button>
            </form>
          </div>
        </Card>

        {loading ? (
          <Card>
            <p className="text-sm text-slate-600 dark:text-white/70">
              Loading…
            </p>
          </Card>
        ) : tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            subtitle="Create your first reminder task above."
          />
        ) : (
          <div
            className="grid 
  gap-6
  sm:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4"
          >
            <AnimatePresence initial={false}>
              {tasks.filter(Boolean).map((t) => (
                <motion.div
                  key={t._id}
                  layout
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.25 }}
                >
                  <Card
                    className="
    p-6 rounded-2xl
    border border-slate-200 dark:border-white/10
    bg-white dark:bg-slate-800
    hover:shadow-xl
    transition-all duration-300
    flex flex-col
    justify-between
    lg:aspect-square
    overflow-hidden
  "
                  >
                    {/* TOP SECTION */}
                    <div className="space-y-3">
                      {/* TITLE */}
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                        {t.title}
                      </h3>

                      {/* META INFO */}
                      <div className="text-xs text-slate-600 dark:text-white/60 space-y-1">
                        <p className="truncate">
                          {t.frequency} •{" "}
                          {new Date(t.startDate).toISOString().slice(0, 10)}
                        </p>

                        <p className="truncate">
                          Ends: {new Date(t.endDate).toISOString().slice(0, 10)}
                        </p>

                        <p className="truncate">
                          Next:{" "}
                          {t.reminderAt
                            ? new Date(t.reminderAt).toLocaleString()
                            : "—"}
                        </p>
                      </div>

                      {/* PROGRESS */}
                      {t.progress?.totalDays > 0 && (
                        <div className="pt-2">
                          <Progress
                            value={Math.round(
                              (t.progress.completedDays /
                                t.progress.totalDays) *
                                100,
                            )}
                          />

                          <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-white/50">
                            <span>
                              {t.progress.completedDays}/{t.progress.totalDays}
                            </span>
                            <span>{t.progress.daysLeft} left</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BOTTOM BUTTONS */}
                    <div className="mt-4 space-y-2">
                      <Button
                        onClick={() => completeToday(t._id)}
                        loading={completing === t._id}
                        disabled={
                          t.progress?.isCompletedToday ||
                          t.progress?.completedDays >= t.progress?.totalDays
                        }
                        variant={
                          t.progress?.isCompletedToday ||
                          t.progress?.completedDays >= t.progress?.totalDays
                            ? "ghost"
                            : "primary"
                        }
                        className="w-full"
                      >
                        {t.progress?.completedDays >= t.progress?.totalDays
                          ? "Finished"
                          : t.progress?.isCompletedToday
                            ? "Completed Today"
                            : "Complete"}
                      </Button>

                      <Button
                        onClick={() => deleteTask(t._id)}
                        loading={deleting === t._id}
                        variant="ghost"
                        className="w-full text-red-500 hover:text-white
      hover:bg-red-500 dark:hover:bg-red-900/30 "
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
