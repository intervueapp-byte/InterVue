import { streamClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
try {
const userId = req.auth.userId;

const token = streamClient.createToken(userId);

res.json({
  token,
  apiKey: process.env.STREAM_API_KEY,
});


} catch (error) {
res.status(500).json({ message: "Failed to get token" });
}
};
