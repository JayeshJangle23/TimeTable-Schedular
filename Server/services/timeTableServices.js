const { default: mongoose } = require("mongoose");
const Timetable = require("../models/TimeTablemodel");

exports.createTimetable = async (userId, data) => {
  const exists = await Timetable.findOne({ userId: userId });
  if (exists) throw new Error("Timetable already exists");

  return await Timetable.create({ userId, ...data });
};

exports.getTimetable = async (userId) => {
  return await Timetable.findOne({ userId });
};

exports.updateTimetable = async (userId, data) => {
  return await Timetable.findOneAndUpdate({ userId }, data, { new: true });
};

exports.toggleStatus = async (userId) => {
  const timetable = await Timetable.findOne({ user: userId });
  if (!timetable) {
    throw new Error("Timetable not found for this user");
  }
  timetable.isActive = !timetable.isActive;

  await timetable.save();

  return timetable;
};

exports.deleteTimetable = async (userId) => {
  const deleted = await Timetable.findOneAndDelete({
    userId: userId,
  });

  if (!deleted) throw new Error("Timetable not found");
  return deleted;
};
