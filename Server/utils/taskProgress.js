exports.getTaskProgress = (task) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(task.startDate);
  const end = new Date(task.endDate);

  // total days task runs
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

  // completed days
  const completedDays = task.completedDates.length;

  // days passed till today
  const daysPassed = Math.min(
    Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1,
    totalDays,
  );

  const daysLeft = Math.max(totalDays - daysPassed, 0);

  const isCompletedToday = task.completedDates.some(
    (d) => d.toDateString() === today.toDateString(),
  );

  return {
    totalDays,
    completedDays,
    daysLeft,
    completedCount: task.completedCount,
    isCompletedToday,
  };
};
