const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // reminderTime: {
    //   type: String,
    //   required: true,
    // },
    reminderAt: {
      type: Date,
      required: true,
      index: true,
    },
    frequency: {
      type: String,
      enum: ["once", "daily", "weekly", "monthly"],
      default: "once",
    },
    completedDates: {
      type: [Date],
      default: [],
    },
    completedCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
taskSchema.index({ reminderAt: 1, status: 1 });

module.exports = mongoose.model("task", taskSchema);
