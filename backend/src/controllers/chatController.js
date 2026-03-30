import { StreamClient } from "@stream-io/node-sdk";

export async function getStreamToken(req, res) {
  try {
    const userId = req.user.clerkId;

    const streamClient = new StreamClient(
      process.env.STREAM_API_KEY,
      process.env.STREAM_API_SECRET
    );

    const token = streamClient.createToken(userId);

res.status(200).json({
  token,
  apiKey: process.env.STREAM_API_KEY,
  userId,
  userName: req.user.name,
  userImage: req.user.profileImage,
});

  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}