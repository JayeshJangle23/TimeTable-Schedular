import api from "../api/axios";

export const AuthService = {
  register(payload) {
    // expects { firstName, emailId, password }
    return api.post("/user/register", payload).then((r) => r.data);
  },
  login(payload) {
    // expects { emailId, password }
    return api.post("/user/login", payload).then((r) => r.data);
  },
  logout() {
    return api.post("/user/logout").then((r) => r.data);
  },
  me() {
    return api.get("/user/me").then((r) => r.data);
  },
};
