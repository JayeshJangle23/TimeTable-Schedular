const cron = require("node-cron");
const Task = require("../models/Task");
const { sendEmail } = require("../utils/emailSender");
const User = require("../models/usermodel");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  console.log("⏰ Cron tick:", now);

  const tasks = await Task.find({
    isReminderSent: false,
    reminderAt: { $lte: now },
  });

  console.log("📦 Tasks found:", tasks.length);

  for (const task of tasks) {
    const user = await User.findById(task.userId);
    if (!user || !user.emailId) {
      console.log("❌ Invalid user/email", user?.emailId);
      continue;
    }

    console.log("📧 Sending to:", user.emailId);

    await sendEmail(
      user.emailId,
      "⏰ Task Reminder",
      `Task: ${task.title}<br/>${task.description || ""}`,
    );

    task.isReminderSent = true;
    await task.save();

    console.log("✅ Email sent for:", task.title);
  }
});
