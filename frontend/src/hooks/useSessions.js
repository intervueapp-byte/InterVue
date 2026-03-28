import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

// CREATE
export const useCreateSession = () => {
  return useMutation({
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created 🚀"),
    onError: (err) =>
      toast.error(err.response?.data?.message || "Create failed"),
  });
};

// ACTIVE
export const useActiveSessions = () => {
  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => sessionApi.getActiveSessions(),
  });
};

// RECENT
export const useMyRecentSessions = () => {
  return useQuery({
    queryKey: ["recentSessions"],
    queryFn: () => sessionApi.getMyRecentSessions(),
  });
};

// GET BY ID
export const useSessionById = (id) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
  });
};

// JOIN
export const useJoinSession = () => {
  return useMutation({
    mutationFn: sessionApi.joinSession,
    onSuccess: () => toast.success("Joined session"),
  });
};

// END
export const useEndSession = () => {
  return useMutation({
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success("Session ended"),
  });
};