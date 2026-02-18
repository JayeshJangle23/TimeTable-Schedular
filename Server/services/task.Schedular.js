// exports.updateNextReminder = (task) => {
//   const date = new Date(task.reminderAt);

//   if (task.frequency === "daily") {
//     date.setDate(date.getDate() + 1);
//   } else if (task.frequency === "weekly") {
//     date.setDate(date.getDate() + 7);
//   } else if (task.frequency === "monthly") {
//     date.setMonth(date.getMonth() + 1);
//   }

//   task.reminderAt = date;
// };
