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

const withAuth = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const sessionApi = {
 createSession: async (data, token) =>
  handleRequest(
    axiosInstance.post(
      "/sessions",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
    "Create Session"
  ),

  getActiveSessions: async (token) =>
    handleRequest(
      axiosInstance.get("/sessions/active", withAuth(token)),
      "Active Sessions"
    ),

  getMyRecentSessions: async (token) =>
    handleRequest(
      axiosInstance.get("/sessions/my-recent", withAuth(token)),
      "Recent Sessions"
    ),

  getSessionById: async (id, token) =>
    handleRequest(
      axiosInstance.get(`/sessions/${id}`, withAuth(token)),
      "Get Session By ID"
    ),

  joinSession: async (id, token) =>
    handleRequest(
      axiosInstance.post(`/sessions/${id}/join`, {}, withAuth(token)),
      "Join Session"
    ),

  endSession: async (id, token) =>
    handleRequest(
      axiosInstance.post(`/sessions/${id}/end`, {}, withAuth(token)),
      "End Session"
    ),

  getStreamToken: async (token) =>
    handleRequest(
      axiosInstance.get("/chat/token", withAuth(token)),
      "Stream Token"
    ),
};