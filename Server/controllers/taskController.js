const Task = require("../models/Task");
const { getTaskProgress } = require("../utils/taskProgress");

exports.createTask = async (req, res) => {
  try {
    const { title, description, reminderTime, frequency, startDate, endDate } =
      req.body;

    if (!reminderTime) {
      return res.status(400).json({ message: "Reminder time required" });
    }

    const [hour, minute] = reminderTime.split(":").map(Number);
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    let reminderAt = new Date();
    reminderAt.setHours(hour, minute, 0, 0);

    if (reminderAt <= now) {
      reminderAt.setDate(reminderAt.getDate() + 1);
    }

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      reminderAt,
      frequency,
      startDate: start,
      endDate: end,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET USER TASKS
exports.getUserTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  const formatted = tasks.map((task) => ({
    ...task.toObject(),
    progress: getTaskProgress(task),
  }));
  res.json(formatted);
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

    const todayStr = new Date();
    todayStr.setHours(0, 0, 0, 0);

    const alreadyDone = task.completedDates.some((d) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.getTime() === todayStr.getTime();
    });

    if (alreadyDone) {
      return res.status(200).json({
        message: "Already completed today",
        task: {
          ...task.toObject(),
          progress: getTaskProgress(task),
        },
      });
    }

    task.completedDates.push(new Date());
    task.completedCount += 1;

    if (task.frequency === "once") {
      task.status = "completed";
    }

    await task.save();

    res.json({
      message: "Task completed",
      task: {
        ...task.toObject(),
        progress: getTaskProgress(task),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
