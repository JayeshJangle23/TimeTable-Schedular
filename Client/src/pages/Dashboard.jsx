import React, { useEffect, useMemo, useState } from "react";
import PageTransition from "../components/common/PageTransition";
import Card from "../components/ui/Card";
import Progress from "../components/ui/Progress";
import toast from "react-hot-toast";
import { TasksService } from "../services/tasks.service";
import { TimetableService } from "../services/timetable.service";
import { normalizeWeeklyTasks, DAY_KEYS, DAY_LABEL } from "../utils/timetable";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [tt, setTt] = useState(null);
  const location = useLocation();
  const load = async () => {
    try {
      const t = await TasksService.list(); // backend returns array
      setTasks(Array.isArray(t) ? t : []);
    } catch (e) {
      toast.error(e.friendlyMessage || "Failed tasks");
    }

    try {
      const x = await TimetableService.get();
      setTt(x);
    } catch {
      setTt(null);
    }
  };

  useEffect(() => {
    load();
  }, [location.pathname]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(
      (x) =>
        x.status === "completed" ||
        x.progress?.completedDays >= x.progress?.totalDays,
    ).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, active: total - done, pct };
  }, [tasks]);

  const weeklyTasks = useMemo(
    () => normalizeWeeklyTasks(tt?.weeklyTasks),
    [tt],
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[rgb(var(--text-main))]">
            Dashboard <span className="grad-text">Overview</span>
          </h1>
          <p className="mt-2 text-sm text-[rgb(var(--text-main))]">
            Tasks + timetable summary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm text-[rgb(var(--text-main))]">Total Tasks</p>
            <p className="mt-2 text-5xl font-bold text-[rgb(var(--text-main))]">
              {stats.total}
            </p>
          </Card>
          <Card>
            <p className="text-sm text-[rgb(var(--text-main))]">Completed</p>
            <p className="mt-2 text-5xl font-bold text-[rgb(var(--text-main))]">
              {stats.done}
            </p>
            <div className="mt-4">
              <Progress value={stats.pct} />
              <p className="mt-2 text-xs text-[rgb(var(--text-main))]">
                {stats.pct}%
              </p>
            </div>
          </Card>
          <Card>
            <p className="text-sm text-[rgb(var(--text-main))]">Active</p>
            <p className="mt-2 text-5xl font-bold text-[rgb(var(--text-main))]">
              {stats.active}
            </p>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-[rgb(var(--text-main))]">
              Weekly Timetable Preview
            </p>
            <p className="text-xs text-[rgb(var(--text-main))]">
              {tt?.isActive ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DAY_KEYS.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-orange-200 p-4"
              >
                <p className="text-lg font-semibold text-[rgb(var(--text-main))]">
                  {DAY_LABEL[k]}
                </p>
                <div className="mt-2 space-y-2">
                  {(weeklyTasks[k] || []).slice(0, 3).map((it, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl  border border-white/10 px-3 py-2"
                    >
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {it.title}
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-white/70">
                        {it.startTime} - {it.endTime}
                      </p>
                    </div>
                  ))}
                  {(weeklyTasks[k] || []).length === 0 ? (
                    <p className="text-xs text-[rgb(var(--text-main))]">
                      No items
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
