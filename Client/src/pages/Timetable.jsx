import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import PageTransition from "../components/common/PageTransition";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Toggle from "../components/ui/Toogle";
import EmptyState from "../components/common/EmptyState";
import { TimetableService } from "../services/timetable.service";
import {
  DAY_KEYS,
  DAY_LABEL,
  emptyWeeklyTasks,
  normalizeWeeklyTasks,
} from "../utils/timetable";

const defaultRow = () => ({ title: "", startTime: "09:00", endTime: "10:00" });

export default function Timetable() {
  const [tt, setTt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingDay, setSavingDay] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const [notificationTime, setNotificationTime] = useState("07:00");
  const [drafts, setDrafts] = useState(() => {
    const d = {};
    for (const k of DAY_KEYS) d[k] = defaultRow();
    return d;
  });

  const fetchTT = async () => {
    setLoading(true);
    try {
      const data = await TimetableService.get();
      setTt(data);
      setNotificationTime(data?.notificationTime || "07:00");
    } catch {
      setTt(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTT();
  }, []);

  const weeklyTasks = useMemo(
    () => normalizeWeeklyTasks(tt?.weeklyTasks),
    [tt],
  );

  const ensureExists = async () => {
    if (tt) return true;
    try {
      const created = await TimetableService.create({
        notificationTime,
        weeklyTasks: emptyWeeklyTasks(),
      });
      setTt(created);
      return true;
    } catch (e) {
      toast.error(e.friendlyMessage || "Create timetable failed");
      return false;
    }
  };

  const saveNotificationTime = async () => {
    const ok = await ensureExists();
    if (!ok) return;
    try {
      const updated = await TimetableService.update({
        notificationTime,
        weeklyTasks,
      });
      setTt(updated);
      toast.success("Notification time saved");
    } catch (e) {
      toast.error(e.friendlyMessage || "Save failed");
    }
  };

  const addItem = async (dayKey) => {
    const ok = await ensureExists();
    if (!ok) return;

    const row = drafts[dayKey];
    if (!row.title) return toast.error("Title required");

    setSavingDay(dayKey);
    try {
      const next = normalizeWeeklyTasks(weeklyTasks);
      next[dayKey] = [...(next[dayKey] || []), { ...row }];

      const updated = await TimetableService.update({
        notificationTime,
        weeklyTasks: next,
      });
      setTt(updated);

      setDrafts((s) => ({ ...s, [dayKey]: defaultRow() }));
      toast.success("Added");
    } catch (e) {
      toast.error(e.friendlyMessage || "Add failed");
    } finally {
      setSavingDay(null);
    }
  };

  const toggleActive = async () => {
    const ok = await ensureExists();
    if (!ok) return;
    setToggling(true);
    try {
      const updated = await TimetableService.toggle();
      setTt(updated);
      toast.success(
        updated?.isActive ? "Timetable active" : "Timetable inactive",
      );
    } catch (e) {
      toast.error(e.friendlyMessage || "Toggle failed");
    } finally {
      setToggling(false);
    }
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await TimetableService.remove();
      setTt(null);
      toast.success("Deleted");
    } catch (e) {
      toast.error(e.friendlyMessage || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const any = Object.values(weeklyTasks).some((arr) => arr.length);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[rgb(var(--text-main))]">
              Timetable <span className="grad-text">Weekly</span>
            </h1>
            <p className="mt-2 text-sm text-[rgb(var(--text-main))]">
              Set notification time and tasks per day.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-green-500 text-white hover:bg-green-800"
              variant="ghost"
              onClick={toggleActive}
              loading={toggling}
              disabled={!tt && !any}
            >
              {tt?.isActive ? "Deactivate" : "Activate"}
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-700"
              variant="danger"
              onClick={remove}
              loading={deleting}
              disabled={!tt && !any}
            >
              Delete
            </Button>
          </div>
        </div>

        {loading ? (
          <Card>
            <p className="text-sm text-slate-600 dark:text-white/70">
              Loading…
            </p>
          </Card>
        ) : !tt && !any ? (
          <EmptyState
            title="No timetable yet"
            subtitle="Add first item to create your timetable."
          />
        ) : null}

        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-[rgb(var(--text-main))]">
                Daily notification time
              </p>
              <p className="mt-1 text-base font-semibold text-[rgb(var(--text-main))]">
                {tt?.notificationTime || notificationTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
                className="max-w-[160px]"
              />
              <Button onClick={saveNotificationTime}>Save</Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {DAY_KEYS.map((dayKey) => (
            <motion.div
              key={dayKey}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br from-orange-500/50 via-orange-500/40 to-orange-400/40 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-[rgb(var(--text-main))]">
                      {DAY_LABEL[dayKey]}
                    </p>
                    <p className="text-xs text-[rgb(var(--text-main))]">
                      {(weeklyTasks[dayKey] || []).length} items
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2 text-[rgb(var(--text-main))]">
                    <Input
                      placeholder="Task title"
                      value={drafts[dayKey].title}
                      onChange={(e) =>
                        setDrafts((s) => ({
                          ...s,
                          [dayKey]: { ...s[dayKey], title: e.target.value },
                        }))
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="time"
                        value={drafts[dayKey].startTime}
                        onChange={(e) =>
                          setDrafts((s) => ({
                            ...s,
                            [dayKey]: {
                              ...s[dayKey],
                              startTime: e.target.value,
                            },
                          }))
                        }
                      />
                      <Input
                        type="time"
                        value={drafts[dayKey].endTime}
                        onChange={(e) =>
                          setDrafts((s) => ({
                            ...s,
                            [dayKey]: { ...s[dayKey], endTime: e.target.value },
                          }))
                        }
                      />
                    </div>
                    <Button
                      onClick={() => addItem(dayKey)}
                      loading={savingDay === dayKey}
                    >
                      Add
                    </Button>
                  </div>

                  <div className="mt-5 space-y-2">
                    <AnimatePresence initial={false}>
                      {(weeklyTasks[dayKey] || []).map((it, idx) => (
                        <motion.div
                          key={`${dayKey}-${idx}`}
                          layout
                          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                          transition={{ duration: 0.22 }}
                          className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3"
                        >
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {it.title}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-600 dark:text-white/70">
                            {it.startTime} - {it.endTime}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {(weeklyTasks[dayKey] || []).length === 0 ? (
                      <div className="rounded-2xl border border-orange-500/90 dark:border-white/10  dark:bg-orange-50 p-4">
                        <p className="text-xs text-[rgb(var(--text-main))]">
                          No items yet.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
