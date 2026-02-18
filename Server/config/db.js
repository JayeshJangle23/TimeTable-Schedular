const mongoose = require("mongoose");

async function main() {
  try {
    const password = encodeURIComponent(process.env.MongoPass);
    console.log(process.env.MongoPass);
    await mongoose.connect(
      `mongodb+srv://timetablereminder:${password}@cluster0.d8sduwd.mongodb.net/`,
    );
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    throw error;
  }
}

module.exports = main;
