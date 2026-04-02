import {
CallControls,
CallingState,
SpeakerLayout,
StreamCall,
StreamVideo,
useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router";

import "@stream-io/video-react-sdk/dist/css/styles.css";

function VideoCallUI({ streamClient, call }) {
const navigate = useNavigate();

if (!streamClient || !call) {
return ( <div className="h-full flex items-center justify-center"> <Loader2Icon className="w-10 h-10 animate-spin" /> </div>
);
}

return ( <StreamVideo client={streamClient}> <StreamCall call={call}> <InnerCallUI /> </StreamCall> </StreamVideo>
);
}

function InnerCallUI() {
const { useCallCallingState, useParticipantCount } = useCallStateHooks();

const callingState = useCallCallingState();
const participantCount = useParticipantCount();
const navigate = useNavigate();

if (callingState === CallingState.JOINING) {
return ( <div className="h-full flex items-center justify-center"> <div className="text-center"> <Loader2Icon className="w-12 h-12 mx-auto animate-spin mb-4" /> <p className="text-lg">Joining call...</p> </div> </div>
);
}

return ( <div className="h-full flex flex-col gap-3 p-3"> <div className="flex items-center justify-between bg-base-100 p-3 rounded-lg shadow"> <div className="flex items-center gap-2"> <UsersIcon className="w-5 h-5" /> <span className="font-semibold">
{participantCount} {participantCount === 1 ? "participant" : "participants"} </span> </div> </div>

```
  <div className="flex-1 bg-base-300 rounded-lg overflow-hidden">
    <SpeakerLayout />
  </div>

  <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
    <CallControls onLeave={() => navigate("/dashboard")} />
  </div>
</div>

);
}

export default VideoCallUI;
