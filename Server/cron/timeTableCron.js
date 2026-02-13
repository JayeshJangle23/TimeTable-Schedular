const cron = require("node-cron");
const Task = require("../models/Task");
const User = require("../models/usermodel");
const { sendEmail } = require("../utils/emailSender");
const TimeTablemodel = require("../models/TimeTablemodel");
// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   console.log("⏰ Cron tick:", now.toString());

//   const tasks = await Task.find({
//     isReminderSent: false,
//     reminderAt: { $lte: now },
//   });

//   console.log("📦 Tasks found:", tasks.length);

//   for (const task of tasks) {
//     const user = await User.findById(task.userId);
//     if (!user) continue;

//     await sendEmail(
//       user.emailId,
//       "⏰ Task Reminder",
//       `Task: ${task.title}\n${task.description || ""}`,
//     );

//     task.isReminderSent = true;
//     await task.save();

//     console.log("✅ Email sent for:", task.title);
//   }
// });

// const cron = require("node-cron");
// const Timetable = require("../models/TimeTablemodel");
// const sendEmail = require("../services/timeTableServices");
// const User = require("../models/usermodel");

// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   const day = now.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
//   console.log("📅 Timetable cron tick", new Date().toLocaleTimeString());
//   const currentTime = now.toTimeString().slice(0, 5);

//   const timetables = await Timetable.find({
//     isActive: true,
//     notificationTime: currentTime,
//   });

//   for (const timetable of timetables) {
//     const tasksToday = timetable.weeklyTasks[day];
//     if (!tasksToday || tasksToday.length === 0) continue;

//     const user = await User.findById(timetable.userId);
//     if (!user || !user.email) continue;

//     const taskList = tasksToday
//       .map((t) => `• ${t.title} (${t.startTime} - ${t.endTime})`)
//       .join("<br/>");

//     await sendEmail(
//       user.email,
//       `📅 ${day.toUpperCase()} Timetable Reminder`,
//       taskList,
//     );

//     console.log(`📧 Timetable reminder sent (${day})`);
//   }
// });

// const cron = require("node-cron");
// const Timetable = require("../models/timetable");
// const User = require("../models/usermodel");
// const { sendEmail } = require("../utils/emailSender");

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const currentTime = now.toTimeString().slice(0, 5); // "10:02"
  const currentDay = now
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase(); // "monday"

  console.log("📅 Timetable cron tick:", currentDay, currentTime);

  const timetables = await TimeTablemodel.find({
    isActive: true,
    notificationTime: currentTime,
  });

  console.log("📦 Timetables found:", timetables.length);

  for (const timetable of timetables) {
    // ⛔ Prevent duplicate mails on same day
    if (
      timetable.lastSentAt &&
      timetable.lastSentAt.toDateString() === now.toDateString()
    ) {
      continue;
    }

    const tasksToday = timetable.weeklyTasks[currentDay];
    if (!tasksToday || tasksToday.length === 0) continue;

    const user = await User.findById(timetable.userId);
    if (!user || !user.emailId?.includes("@")) continue;

    const taskList = tasksToday
      .map((t) => `• ${t.title} (${t.startTime} - ${t.endTime})`)
      .join("<br/>");

    await sendEmail(
      user.emailId,
      "📅 Today's Timetable",
      `<b>${currentDay.toUpperCase()}</b><br/>${taskList}`,
    );

    timetable.lastSentAt = now;
    await timetable.save();

    console.log("✅ Timetable email sent to:", user.emailId);
  }
});
