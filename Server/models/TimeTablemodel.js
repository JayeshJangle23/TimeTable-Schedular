const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startTime: String, // "09:00"
  endTime: String, // "10:30"
});

const timetableSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    notificationTime: {
      type: String, // "07:00"
      required: true,
    },

    weeklyTasks: {
      monday: [taskSchema],
      tuesday: [taskSchema],
      wednesday: [taskSchema],
      thursday: [taskSchema],
      friday: [taskSchema],
      saturday: [taskSchema],
      sunday: [taskSchema],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastSentAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("timetable", timetableSchema);
