import Session from "../models/Session.js";
import User from "../models/User.js";
import { streamClient } from "../lib/stream.js";

export const createSession = async (req, res) => {
try {
const userId = req.auth.userId;

```
const user = await User.findOne({ clerkId: userId });
if (!user) return res.status(404).json({ message: "User not found" });

const { problem, difficulty } = req.body;
const callId = userId + "-" + Date.now();

await streamClient.upsertUser({
  id: userId,
  role: "user",
});

const call = streamClient.video.call("default", callId);

await call.create({
  data: {
    created_by_id: userId,
    members: [{ user_id: userId }],
  },
});

const session = await Session.create({
  problem,
  difficulty: difficulty || "easy",
  host: user._id,
  callId,
  status: "active",
});

res.status(201).json(session);
```

} catch (error) {
res.status(500).json({ message: "Failed to create session" });
}
};

export const joinSession = async (req, res) => {
try {
const userId = req.auth.userId;

```
const session = await Session.findById(req.params.id);
if (!session) return res.status(404).json({ message: "Session not found" });

await streamClient.upsertUser({
  id: userId,
  role: "user",
});

const token = streamClient.createToken(userId);

res.json({
  callId: session.callId,
  token,
  apiKey: process.env.STREAM_API_KEY,
});
```

} catch (error) {
res.status(500).json({ message: "Failed to join session" });
}
};

export const getActiveSessions = async (req, res) => {
try {
const sessions = await Session.find({ status: "active" })
.populate("host", "name profileImage")
.sort({ createdAt: -1 });

```
res.json(sessions);
```

} catch (error) {
res.status(500).json({ message: "Failed to fetch active sessions" });
}
};

export const getMyRecentSessions = async (req, res) => {
try {
const userId = req.auth.userId;

```
const user = await User.findOne({ clerkId: userId });
if (!user) return res.status(404).json({ message: "User not found" });

const sessions = await Session.find({ host: user._id })
  .sort({ createdAt: -1 })
  .limit(10);

res.json(sessions);
```

} catch (error) {
res.status(500).json({ message: "Failed to fetch sessions" });
}
};

export const getSessionById = async (req, res) => {
try {
const session = await Session.findById(req.params.id).populate(
"host",
"name profileImage"
);

```
if (!session) return res.status(404).json({ message: "Session not found" });

res.json(session);
```

} catch (error) {
res.status(500).json({ message: "Error fetching session" });
}
};

export const endSession = async (req, res) => {
try {
const session = await Session.findById(req.params.id);

```
if (!session) return res.status(404).json({ message: "Session not found" });

session.status = "ended";
await session.save();

res.json({ message: "Session ended" });
```

} catch (error) {
res.status(500).json({ message: "Failed to end session" });
}
};
