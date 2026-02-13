const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getUserTasks,
  completeTaskForToday,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth, createTask);

router.get("/", auth, getUserTasks);
router.patch("/:id/complete", auth, completeTaskForToday);

module.exports = router;
