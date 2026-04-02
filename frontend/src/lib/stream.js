import { StreamVideoClient } from "@stream-io/video-react-sdk";

let client = null;

export const initializeStreamClient = async ({ apiKey, user, token }) => {
  if (client) return client;

  client = new StreamVideoClient({
    apiKey,
    user,
    token,
  });

  return client;
};

export const disconnectStreamClient = async () => {
  if (!client) return;

  await client.disconnectUser();
  client = null;
};