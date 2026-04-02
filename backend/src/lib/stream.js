import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("❌ STREAM_API_KEY or STREAM_API_SECRET is missing");
}

// ✅ Chat client (for messaging + optional events)
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

// ✅ Server client (for tokens + video call creation)
export const streamClient = new StreamClient(apiKey, apiSecret);

// ✅ Create / update user in Stream
export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser({
      id: userData.id,
      name: userData.name,
      image: userData.image || "",
    });

    console.log("✅ Stream user upserted:", userData.id);
  } catch (error) {
    console.error("❌ Error upserting user:", error.message);
  }
};

// ✅ Delete user
export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("✅ Stream user deleted:", userId);
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
  }
};