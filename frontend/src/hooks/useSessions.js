import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = (token) => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data) => sessionApi.createSession(data, token),
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create room"),
  });
};

export const useActiveSessions = (token) => {
  return useQuery({
    queryKey: ["activeSessions", token],
    queryFn: () => sessionApi.getActiveSessions(token),
    enabled: !!token,
  });
};

export const useMyRecentSessions = (token) => {
  return useQuery({
    queryKey: ["myRecentSessions", token],
    queryFn: () => sessionApi.getMyRecentSessions(token),
    enabled: !!token,
  });
};

export const useSessionById = (id, token) => {
  return useQuery({
    queryKey: ["session", id, token],
    queryFn: () => sessionApi.getSessionById(id, token),
    enabled: !!id && !!token,
    refetchInterval: 5000,
  });
};

export const useJoinSession = (token) => {
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: (id) => sessionApi.joinSession(id, token),
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

export const useEndSession = (token) => {
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: (id) => sessionApi.endSession(id, token),
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session"),
  });
};