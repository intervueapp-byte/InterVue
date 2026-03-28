import axiosInstance from "../lib/axios";

const handleRequest = async (promise, label) => {
  try {
    const res = await promise;
    console.log(`✅ ${label}:`, res.data);
    return res.data;
  } catch (err) {
    console.error(`❌ ${label} ERROR:`, err?.response?.data || err.message);
    throw err;
  }
};

export const sessionApi = {
  createSession: async (data) =>
    handleRequest(
      axiosInstance.post("/sessions", data),
      "Create Session"
    ),

  getActiveSessions: async () =>
    handleRequest(
      axiosInstance.get("/sessions/active"),
      "Active Sessions"
    ),

  getMyRecentSessions: async () =>
    handleRequest(
      axiosInstance.get("/sessions/my-recent"),
      "Recent Sessions"
    ),

  getSessionById: async (id) =>
    handleRequest(
      axiosInstance.get(`/sessions/${id}`),
      "Get Session By ID"
    ),

  joinSession: async (id) =>
    handleRequest(
      axiosInstance.post(`/sessions/${id}/join`),
      "Join Session"
    ),

  endSession: async (id) =>
    handleRequest(
      axiosInstance.post(`/sessions/${id}/end`),
      "End Session"
    ),

  getStreamToken: async () =>
    handleRequest(
      axiosInstance.get("/chat/token"),
      "Stream Token"
    ),
};