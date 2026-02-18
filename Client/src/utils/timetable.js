export const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const DAY_LABEL = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const emptyWeeklyTasks = () => {
  const o = {};
  for (const k of DAY_KEYS) o[k] = [];
  return o;
};

export const normalizeWeeklyTasks = (weeklyTasks) => {
  const base = emptyWeeklyTasks();
  if (!weeklyTasks || typeof weeklyTasks !== "object") return base;
  for (const k of DAY_KEYS)
    base[k] = Array.isArray(weeklyTasks[k]) ? weeklyTasks[k] : [];
  return base;
};
