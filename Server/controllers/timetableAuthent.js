const service = require("../services/timeTableServices");

exports.create = async (req, res) => {
  try {
    const timetable = await service.createTimetable(req.user._id, req.body);
    res.status(201).json(timetable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  const timetable = await service.getTimetable(req.user._id);
  if (!timetable) {
    return res.status(404).json({ message: "No timetable found" });
  }
  res.json(timetable);
};

exports.update = async (req, res) => {
  const updated = await service.updateTimetable(req.user._id, req.body);
  res.json(updated);
};

exports.toggle = async (req, res) => {
  const updated = await service.toggleStatus(req.user._id);
  res.json(updated);
};

exports.remove = async (req, res) => {
  try {
    await service.deleteTimetable(req.user._id);
    res.json({ message: "Timetable deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
