import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";

let clientInstance = null;

function useStreamClient(session, loadingSession) {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;

    const init = async () => {
      try {
        if (!session || loadingSession) return;
        if (!session.callId) return;
        if (!user) return;

        const clerkToken = await getToken();

        const res = await fetch(
          "https://intervue-t8xv.onrender.com/api/chat/token",
          {
            headers: {
              Authorization: `Bearer ${clerkToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Token fetch failed");

        const { token, apiKey } = await res.json();

        clientInstance = new StreamVideoClient({
          apiKey,
          user: {
            id: user.id,
            name: user.fullName || "User",
            image: user.imageUrl,
          },
          token,
        });

        setStreamClient(clientInstance);

        videoCall = clientInstance.call("default", session.callId);
        await videoCall.join({
  create: true,
  audio: true,
  video: true,
});

await videoCall.microphone.enable();
await videoCall.camera.enable();

await videoCall.startPublishing();


        setCall(videoCall);
      } catch (err) {
        console.error("VIDEO ERROR:", err);
      } finally {
        setIsInitializingCall(false);
      }
    };

    init();

    return () => {
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (clientInstance) await clientInstance.disconnectUser();
        } catch {}
      })();
    };
  }, [session, loadingSession, user]);

  return {
    streamClient,
    call,
    isInitializingCall,
  };
}

export default useStreamClient;