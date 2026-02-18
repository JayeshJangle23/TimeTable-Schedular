const express = require("express");
const { register, login, logout } = require("../controllers/userAuthent");
const authMiddleware = require("../middleware/authMiddleware");
const authRouter = express.Router();
const { getMe } = require("../controllers/userAuthent");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authMiddleware, getMe);

module.exports = authRouter;
