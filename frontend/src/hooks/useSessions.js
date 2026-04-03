import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = (token) => {
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: async (data) => {
      if (!token) throw new Error("Missing auth token");
      return await sessionApi.createSession(data, token);
    },
    onSuccess: () => {
      toast.success("Session created successfully!");
    },
    onError: (error) => {
      console.error("Create session error:", error);
      toast.error(error?.response?.data?.message || "Failed to create room");
    },
  });
};

export const useActiveSessions = (token) => {
  return useQuery({
    queryKey: ["activeSessions", token],
    queryFn: async () => {
      if (!token) throw new Error("Missing auth token");
      return await sessionApi.getActiveSessions(token);
    },
    enabled: !!token,
    staleTime: 1000 * 30,
  });
};

export const useMyRecentSessions = (token) => {
  return useQuery({
    queryKey: ["myRecentSessions", token],
    queryFn: async () => {
      if (!token) throw new Error("Missing auth token");
      return await sessionApi.getMyRecentSessions(token);
    },
    enabled: !!token,
    staleTime: 1000 * 30,
  });
};

export const useSessionById = (id, token) => {
  return useQuery({
    queryKey: ["session", id, token],

    queryFn: async () => {
      if (!id) throw new Error("Missing session ID");
      if (!token) throw new Error("Missing auth token");

      const res = await sessionApi.getSessionById(id, token);

      if (!res) {
        throw new Error("Session not found");
      }

      return res;
    },

    enabled: !!id && !!token,

    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useJoinSession = (token) => {
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: async (id) => {
      if (!token) throw new Error("Missing auth token");
      return await sessionApi.joinSession(id, token);
    },
    onSuccess: () => {
      toast.success("Joined session successfully!");
    },
    onError: (error) => {
      console.error("Join session error:", error);
      toast.error(error?.response?.data?.message || "Failed to join session");
    },
  });
};

export const useEndSession = (token) => {
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: async (id) => {
      if (!token) throw new Error("Missing auth token");
      return await sessionApi.endSession(id, token);
    },
    onSuccess: () => {
      toast.success("Session ended successfully!");
    },
    onError: (error) => {
      console.error("End session error:", error);
      toast.error(error?.response?.data?.message || "Failed to end session");
    },
  });
};