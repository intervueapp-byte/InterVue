import { StreamVideoClient } from "@stream-io/video-react-sdk";

let client = null;

// ✅ Initialize video client
export const initializeStreamClient = async (user, token) => {
  if (client) return client;

  client = new StreamVideoClient({
    apiKey: import.meta.env.VITE_STREAM_API_KEY,
    user,
    token,
  });

  return client;
};

// ✅ Disconnect safely
export const disconnectStreamClient = async () => {
  if (!client) {
    console.log("⚡ No Stream client to disconnect");
    return;
  }

  await client.disconnectUser();
  client = null;
};