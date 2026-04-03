import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useSessionById } from "../hooks/useSessions";
import Navbar from "../components/Navbar";
import { Loader2Icon, PhoneOffIcon } from "lucide-react";
import useStreamClient from "../hooks/useStreamClient";
import VideoCallUI from "../components/VideoCallUI";
import { StreamVideo } from "@stream-io/video-react-sdk";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useAuth();
  const { user } = useUser();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const t = await getToken();
        setToken(t);
      } catch (err) {
        console.error("Token error:", err);
      }
    };
    fetchToken();
  }, []);

  const {
    data: session,
    isLoading: loadingSession,
  } = useSessionById(id, token);

  const {
    call,
    streamClient,
    isInitializingCall,
  } = useStreamClient(session, loadingSession);

  const endSessionMutation = useEndSession();

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2Icon className="w-10 h-10 animate-spin" />
        <p className="ml-2">Loading authentication...</p>
      </div>
    );
  }

  if (loadingSession || !session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2Icon className="w-10 h-10 animate-spin" />
        <p className="ml-2">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-base-100">
      <Navbar />

      <div className="flex-1 flex">
        <div className="w-1/2 p-4">
          <h1 className="text-xl font-bold">{session.problem}</h1>
          <p>Host: {session.host?.name}</p>
        </div>

        <div className="w-1/2 p-4">
          {isInitializingCall ? (
            <div className="h-full flex items-center justify-center">
              <Loader2Icon className="w-12 h-12 animate-spin" />
            </div>
          ) : !streamClient || !call ? (
            <div className="h-full flex items-center justify-center">
              <PhoneOffIcon className="w-12 h-12 text-red-500" />
            </div>
          ) : (
<StreamVideo client={streamClient}>
<VideoCallUI streamClient={streamClient} call={call} />
</StreamVideo>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionPage;