import { useState } from "react";
import API from "../api/axios";

function CreateTimetable() {
  const [notificationTime, setNotificationTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/timetable", {
        notificationTime,
        weeklyTasks: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      });

      alert("Timetable saved!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save timetable");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Timetable</h2>
      <form onSubmit={handleSubmit}>
        <label>Notification Time</label>
        <input
          type="time"
          onChange={(e) => setNotificationTime(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateTimetable;
