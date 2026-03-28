import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;

export const initializeStreamClient = async (user, token) => {
  try {
    if (!apiKey) throw new Error("Stream API key missing");

    if (!user?.id) {
      throw new Error("❌ USER ID MISSING");
    }

    console.log("🔥 INITIALIZING STREAM USER:", user);

    if (client) {
      await client.disconnectUser();
      client = null;
    }

    client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,              // ✅ MUST BE STRING
        name: user.name || "User",
        image: user.image || "",
      },
      token,
    });

    console.log("✅ STREAM CONNECTED:", user.id);

    return client;

  } catch (error) {
    console.error("❌ STREAM INIT ERROR:", error);
  }
};

export const disconnectStreamClient = async () => {
  if (client) {
    try {
      await client.disconnectUser();
      client = null;
    } catch (error) {
      console.error("Error disconnecting Stream client:", error);
    }
  }
};