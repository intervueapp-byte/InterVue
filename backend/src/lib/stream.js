import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
console.error("❌ STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const streamClient = new StreamClient(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
try {
await streamClient.upsertUser({
id: userData.id,
role: "user",
});
} catch (error) {
console.error("❌ Error upserting user:", error.message);
}
};

export const deleteStreamUser = async (userId) => {
try {
await streamClient.deleteUser(userId);
} catch (error) {
console.error("❌ Error deleting user:", error.message);
}
};
