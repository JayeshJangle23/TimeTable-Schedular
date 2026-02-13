// const Task = require("../models/Task");
// const { getTaskProgress } = require("../utils/taskProgress");

// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, reminderTime } = req.body;

//     // reminderTime = "14:30"
//     const [hour, minute] = reminderTime.split(":").map(Number);

//     const now = new Date();
//     // const reminderAt = new Date();
//     // reminderAt.setHours(hour, minute, 0, 0);
//     const reminderAt = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       hour,
//       minute,
//       0,
//       0,
//     );

//     // If time already passed today → send tomorrow
//     if (reminderAt < now) {
//       reminderAt.setDate(reminderAt.getDate() + 1);
//     }
//     console.log("🕒 ReminderAt:", reminderAt.toString());

//     const task = await Task.create({
//       title,
//       description,
//       reminderAt,
//       userId: req.user._id,
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.getUserTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user._id });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // COMPLETE TASK FOR TODAY
// exports.completeTaskForToday = async (req, res) => {
//   try {
//     const task = await Task.findOne({
//       _id: req.params.id,
//       userId: req.user._id, // ✅ ownership check
//     });

//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     const today = new Date().toDateString();

//     const alreadyCompleted = task.completedDates.some(
//       (d) => d.toDateString() === today,
//     );

//     if (alreadyCompleted) {
//       return res
//         .status(400)
//         .json({ message: "Task already completed for today" });
//     }

//     task.completedDates.push(new Date());
//     task.completedCount += 1;

//     await task.save();

//     res.json({
//       message: "Task marked completed",
//       task,
//       progress: getTaskProgress(task),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Task = require("../models/Task");
const { getTaskProgress } = require("../utils/taskProgress");

exports.createTask = async (req, res) => {
  try {
    const { title, description, reminderTime, frequency } = req.body;

    if (!reminderTime) {
      return res.status(400).json({ message: "Reminder time required" });
    }

    const [hour, minute] = reminderTime.split(":").map(Number);
    const now = new Date();

    let reminderAt = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      0,
      0,
    );

    if (reminderAt < now) {
      reminderAt.setDate(reminderAt.getDate() + 1);
    }

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      reminderAt,
      frequency,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET USER TASKS
exports.getUserTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

// COMPLETE TASK FOR TODAY
exports.completeTaskForToday = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const todayStr = new Date().toDateString();

    const alreadyDone = task.completedDates.some(
      (d) => d.toDateString() === todayStr,
    );

    if (alreadyDone) {
      return res.status(400).json({ message: "Already completed today" });
    }

    task.completedDates.push(new Date());
    task.completedCount += 1;

    if (task.frequency === "once") {
      task.status = "completed";
    }

    await task.save();

    res.json({
      message: "Task completed",
      progress: getTaskProgress(task),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
