import api from "../api/axios";

export const TimetableService = {
  create(payload) {
    // expects { notificationTime, weeklyTasks }
    return api.post("/api/timetable", payload).then((r) => r.data);
  },
  get() {
    return api.get("/api/timetable").then((r) => r.data);
  },
  update(payload) {
    return api.put("/api/timetable", payload).then((r) => r.data);
  },
  toggle() {
    return api.patch("/api/timetable/toggle").then((r) => r.data);
  },
  remove() {
    return api.delete("/api/timetable").then((r) => r.data);
  },
};
