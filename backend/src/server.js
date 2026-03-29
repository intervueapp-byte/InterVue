import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { chatClient } from "./lib/stream.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import codeRoutes from "./routes/codeRoutes.js";

dotenv.config();

const app = express();

app.get("/api/inngest", (req, res) => {
  res.status(200).send("OK");
});

app.post(
  "/api/inngest",
  express.raw({ type: "application/json" }),
  serve({
    client: inngest,
    functions,
  })
);

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

app.post("/api/clerk-webhook", async (req, res) => {
  try {
    const event = req.body;

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
    res.status(500).json({ error: err.message });
  }
});

app.use(clerkMiddleware());

app.get("/stream-users", async (req, res) => {
  try {
    const users = await chatClient.queryUsers({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is running" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/code", codeRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

const PORT = process.env.PORT || ENV.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
};

startServer();