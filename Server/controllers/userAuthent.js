const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, password, emailId } = req.body;

    if (!emailId || !password || !firstName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      emailId,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };

    return res.status(201).json({
      user: reply,
      token,
      message: "Loggin Successfully",
    });
  } catch (err) {
    return res.status(400).send("Error: " + err);
  }
};
const login = async (req, res) => {
  try {
    const { password, emailId } = req.body;
    if (!emailId) throw new Error("Invalid Credentials");
    if (!password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials.." });
    }

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true only in production HTTPS
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.status(201).json({
      user: reply,
      message: "Loggin Successfully",
    });
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(503).send("Error: " + err);
  }
};

const getMe = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { register, login, logout, getMe };
