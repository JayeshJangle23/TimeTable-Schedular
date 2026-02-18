const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getUserTasks,
  completeTaskForToday,
  deleteTask,
} = require("../controllers/taskController");
const validate = require("../middleware/validate.middleware");
const { createTaskValidator } = require("../validators/task.validator");

const router = express.Router();

router.post("/", auth, validate(createTaskValidator), createTask);

router.get("/", auth, getUserTasks);
router.patch("/:id/complete", auth, completeTaskForToday);
router.delete("/:id", auth, deleteTask);

module.exports = router;
