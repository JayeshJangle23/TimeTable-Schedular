import { useEffect, useState } from "react";
import API from "../api/axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completeTask = async (id) => {
    await API.patch(`/api/tasks/${id}/complete`);
    fetchTasks();
  };

  return (
    <div className="page">
      <h2>Your Tasks</h2>

      {tasks.map((task) => (
        <div key={task._id} className="card">
          <h4>{task.title}</h4>
          <p>Status: {task.status}</p>
          <p>Frequency: {task.frequency}</p>
          <button onClick={() => completeTask(task._id)}>Complete Today</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
