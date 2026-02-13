const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/timetableAuthent");

router.post("/", auth, controller.create);
router.get("/", auth, controller.get);
router.put("/", auth, controller.update);
router.patch("/toggle", auth, controller.toggle);
router.delete("/", auth, controller.remove);

module.exports = router;
