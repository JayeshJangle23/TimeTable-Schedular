import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    reminderTime: "",
    frequency: "daily",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/api/tasks", form);

    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="time"
          onChange={(e) => setForm({ ...form, reminderTime: e.target.value })}
        />

        <input
          type="date"
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />

        <input
          type="date"
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <select
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
        >
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <button>Create</button>
      </form>
    </div>
  );
}
