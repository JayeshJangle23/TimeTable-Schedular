import api from "../api/axios";

export const TasksService = {
  create(payload) {
    // expects { title, description, reminderTime, frequency, startDate, endDate }
    return api.post("/api/tasks", payload).then((r) => r.data);
  },
  list() {
    return api.get("/api/tasks").then((r) => r.data);
  },
  complete(id) {
    return api.patch(`/api/tasks/${id}/complete`).then((r) => r.data);
  },
  delete(id) {
    return api.delete(`/api/tasks/${id}`).then((r) => r.data);
  },
};
