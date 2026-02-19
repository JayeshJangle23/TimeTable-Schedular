require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/userAuth");
const taskRoutes = require("./routes/taskRoutes");
const timetableRouter = require("./routes/timetableRouter");
require("./cron");
const helmet = require("helmet");
const rateLimiter = require("./middleware/rateLimit.middleware");

// require("./cron/taskCron");
// require("./cron/timeTableCron");

const main = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for form data
app.use(cookieParser()); // for form data
app.use(rateLimiter);
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://remindrrr.vercel.app",
      "https://remindrrr-216mdp27u-jayeshjangle23s-projects.vercel.app",
    ],
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/user", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/timetable", require("./routes/timetableRouter"));
app.use(errorHandler);

const InitalizeConnection = async () => {
  try {
    await main();
    console.log("MONGODB CONNECTED SUCCESSFULLY ! ");
    app.listen(3000, () => {
      console.log(`SERVER RUNNING ON 3000`);
      console.log("🕒 Server time:", new Date().toString());
    });
  } catch (err) {
    console.error("❌ Server initialization failed:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  }
};
InitalizeConnection();

app.get("/", (req, res) => {
  res.send("HELLO WELCOME IN A REMINDrrr");
});
