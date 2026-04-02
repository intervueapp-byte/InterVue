import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      if (!session?.callId) return;
      if (!user) return;
      if (!isHost && !isParticipant) return;
      if (session.status === "completed") return;

      try {
        const clerkToken = await getToken();
        const { token, apiKey } = await sessionApi.getStreamToken(clerkToken);

        const client = await initializeStreamClient({
          apiKey,
          user: {
            id: user.id,
            name: user.fullName || "User",
            image: user.imageUrl,
          },
          token,
        });

        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: user.id,
            name: user.fullName || "User",
            image: user.imageUrl,
          },
          token
        );

        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId,
          {
            members: [user.id],
          }
        );

        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        console.error("Error init call", error);
        toast.error("Failed to join video call");
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) {
      initCall();
    }

    return () => {
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          if (streamClient) await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [session, loadingSession, isHost, isParticipant, user, getToken]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;