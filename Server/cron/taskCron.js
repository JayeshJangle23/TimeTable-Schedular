const cron = require("node-cron");
const Task = require("../models/Task");
const User = require("../models/usermodel");
const TimeTablemodel = require("../models/TimeTablemodel");
const { sendEmail } = require("../utils/emailSender");
const { updateNextReminder } = require("../utils/reminderSchedular");
const {
  generateMorningEmail,
  generateTaskReminderEmail,
} = require("../utils/generateMorningEmail");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    // Create 1-minute window
    const start = new Date(now);
    start.setSeconds(0, 0);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + 1);

    const tasks = await Task.find({
      status: "active",
      reminderAt: { $gte: start, $lt: end },
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    for (const task of tasks) {
      const user = await User.findById(task.userId);
      if (!user?.emailId) continue;

      // await sendEmail(
      //   user.emailId,
      //   "⏰ Task Reminder",
      //   `<b>${task.title}</b><br/>${task.description || ""}`,
      // );

      const html = generateTaskReminderEmail(user.firstName, task);

      await sendEmail(user.emailId, "⏰ Task Reminder", html);

      console.log("✅ Task sent:", task.title);

      if (task.frequency === "once") {
        task.status = "completed";
      } else {
        updateNextReminder(task); // move to next day/week/month
      }

      await task.save();
    }

    // ==================================================
    // 🟢 TIMETABLE REMINDER
    // ==================================================

    const currentDay = now
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    const timetables = await TimeTablemodel.find({
      isActive: true,
    });

    for (const timetable of timetables) {
      const tasksToday = timetable.weeklyTasks[currentDay];

      if (!tasksToday || tasksToday.length === 0) continue;

      const [hour, minute] = timetable.notificationTime.split(":").map(Number);

      const notificationDate = new Date(now);
      notificationDate.setHours(hour, minute, 0, 0);

      if (notificationDate >= start && notificationDate < end) {
        const alreadySentToday =
          timetable.lastSentAt &&
          timetable.lastSentAt.toDateString() === now.toDateString();

        if (alreadySentToday) continue;

        const user = await User.findById(timetable.userId);
        if (!user?.emailId) continue;

        const taskList = tasksToday
          .map((t) => `• ${t.title} (${t.startTime} - ${t.endTime})`)
          .join("<br/>");

        // await sendEmail(
        //   user.emailId,
        //   `📅 ${currentDay.toUpperCase()} Timetable`,
        //   taskList,
        // );
        const html = generateMorningEmail(
          user.firstName,
          currentDay,
          tasksToday,
        );

        await sendEmail(
          user.emailId,
          `📅 ${currentDay.toUpperCase()} Timetable`,
          html,
        );

        timetable.lastSentAt = now;
        await timetable.save();

        console.log("✅ Timetable sent:", user.emailId);
      }
    }
  } catch (error) {
    console.error("❌ Cron error:", error.message);
  }
});
