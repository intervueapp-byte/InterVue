import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);
export const streamClient = new StreamClient(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser({
      id: userData.id,
      name: userData.name,
      image: userData.image || "",
      role: "admin",
    });
  } catch (error) {
    console.error("Error upserting user:", error.message);
  }
};

export const createStreamChannel = async (channelId, members) => {
  try {
    const channel = chatClient.channel("messaging", channelId, {
      members,
      created_by_id: members[0],
    });

    await channel.create();

    return channel;
  } catch (error) {
    console.error("Error creating channel:", error.message);
    throw error;
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};