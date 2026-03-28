import axiosInstance from "../lib/axios";

// 🔥 helper logger (VERY IMPORTANT for debugging)
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
  // ✅ CREATE SESSION
  createSession: async (data) =>
    handleRequest(
      axiosInstance.post("/sessions", data),
      "Create Session"
    ),

  // ✅ GET ACTIVE SESSIONS
  getActiveSessions: async () =>
    handleRequest(
      axiosInstance.get("/sessions/active"),
      "Active Sessions"
    ),

  // ✅ GET RECENT SESSIONS
  getMyRecentSessions: async () =>
    handleRequest(
      axiosInstance.get("/sessions/my-recent"),
      "Recent Sessions"
    ),

  // ✅ GET SESSION BY ID
  getSessionById: async (id) =>
    handleRequest(
      axiosInstance.get(`/sessions/${id}`),
      "Get Session By ID"
    ),

  // ✅ JOIN SESSION
  joinSession: async (id) =>
    handleRequest(
      axiosInstance.post(`/sessions/${id}/join`),
      "Join Session"
    ),

  // ✅ END SESSION
  endSession: async (id) =>
    handleRequest(
      axiosInstance.post(`/sessions/${id}/end`),
      "End Session"
    ),

  // ✅ STREAM TOKEN
  getStreamToken: async () =>
    handleRequest(
      axiosInstance.get("/chat/token"),
      "Stream Token"
    ),
};