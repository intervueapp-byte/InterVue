import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { chatClient } from "./lib/stream.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();


// 🔥 1. INNGEST ROUTE FIRST (RAW BODY REQUIRED)
app.use(
  "/api/inngest",
  express.raw({ type: "application/json" }), // ✅ CRITICAL FIX
  serve({
    client: inngest,
    functions,
    signingKey: "", // disable signature for Clerk
  })
);


// ✅ 2. JSON + CORS (AFTER INNGEST)
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inter-vue-official.vercel.app",
    ],
    credentials: true,
  })
);


// 🔥 3. CLERK WEBHOOK → SEND TO INNGEST
app.post("/api/clerk-webhook", async (req, res) => {
  try {
    const event = req.body;

    console.log("📩 Clerk Webhook Received:", event.type);

    if (event.type === "user.created") {
      await inngest.send({
        name: "clerk/user.created",
        data: event.data,
      });
    }

    if (event.type === "user.deleted") {
      await inngest.send({
        name: "clerk/user.deleted",
        data: event.data,
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Clerk webhook error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ 4. CLERK AUTH MIDDLEWARE
app.use(clerkMiddleware());


// ✅ 5. DEBUG ROUTE → STREAM USERS
app.get("/stream-users", async (req, res) => {
  try {
    const users = await chatClient.queryUsers({});
    res.json(users);
  } catch (err) {
    console.error("❌ Stream fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ 6. HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is running" });
});


// ✅ 7. ROUTES
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);


// ✅ 8. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});


// ✅ 9. START SERVER
const PORT = process.env.PORT || ENV.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();