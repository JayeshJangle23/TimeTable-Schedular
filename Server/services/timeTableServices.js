const { default: mongoose } = require("mongoose");
const Timetable = require("../models/TimeTablemodel");

exports.createTimetable = async (userId, data) => {
  const exists = await Timetable.findOne({ userId });
  if (exists) throw new Error("Timetable already exists");

  return Timetable.create({ userId, ...data });
};

exports.getTimetable = (userId) => {
  return Timetable.findOne({ userId });
};

exports.updateTimetable = (userId, data) => {
  return Timetable.findOneAndUpdate({ userId }, data, { new: true });
};

exports.toggleStatus = (userId) => {
  return Timetable.findOneAndUpdate(
    { userId },
    [{ $set: { isActive: { $not: "$isActive" } } }],
    { new: true },
  );
};

exports.deleteTimetable = async (userId) => {
  console.log("DELETE userId:", userId, typeof userId);
  const deleted = await Timetable.findOneAndDelete({
    userId: userId,
  });

  if (!deleted) throw new Error("Timetable not found");
  return deleted;
};
