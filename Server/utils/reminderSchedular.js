exports.updateNextReminder = (task) => {
  if (task.frequency === "daily") {
    task.reminderAt.setDate(task.reminderAt.getDate() + 1);
  } else if (task.frequency === "weekly") {
    task.reminderAt.setDate(task.reminderAt.getDate() + 7);
  } else if (task.frequency === "monthly") {
    task.reminderAt.setMonth(task.reminderAt.getMonth() + 1);
  }
};
