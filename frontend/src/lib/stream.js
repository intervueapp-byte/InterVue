import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

// 🔒 Singleton instance
let client = null;
let currentUserId = null;

export const initializeStreamClient = async (user, token) => {
  try {
    // 🔐 Basic validation
    if (!apiKey) {
      throw new Error("❌ Stream API key missing");
    }

    if (!user || !user.id) {
      throw new Error("❌ USER ID MISSING");
    }

    if (!token) {
      throw new Error("❌ STREAM TOKEN MISSING");
    }

    const userId = String(user.id);

    console.log("🔥 Initializing Stream for:", userId);

    // ✅ Prevent re-initializing same user
    if (client && currentUserId === userId) {
      console.log("⚡ Stream already initialized for this user");
      return client;
    }

    // 🔁 If different user → disconnect old one
    if (client) {
      console.log("🔁 Disconnecting previous user:", currentUserId);
      try {
        await client.disconnectUser();
      } catch (err) {
        console.warn("⚠️ Error disconnecting old user:", err.message);
      }
      client = null;
      currentUserId = null;
    }

    // 🚀 Create new client
    client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: user.name || "User",
        image: user.image || "",
      },
      token,
    });

    currentUserId = userId;

    console.log("✅ Stream connected:", userId);

    return client;

  } catch (error) {
    console.error("❌ STREAM INIT ERROR:", error.message);
    return null; // prevent crash in UI
  }
};

export const getStreamClient = () => {
  return client;
};

export const disconnectStreamClient = async () => {
  if (!client) {
    console.log("⚡ No Stream client to disconnect");
    return;
  }

  try {
    console.log("🔌 Disconnecting Stream user:", currentUserId);

    await client.disconnectUser();

    client = null;
    currentUserId = null;

    console.log("✅ Stream disconnected");

  } catch (error) {
    console.error("❌ Error disconnecting Stream client:", error.message);
  }
};