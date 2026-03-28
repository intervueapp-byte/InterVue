import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { inngest, functions } from "./lib/inngest.js";
import { connectDB } from "./lib/db.js";

const app = express();

// 🚨 CRITICAL FIX — RAW BODY FIRST
app.post(
  "/api/inngest",
  express.raw({ type: "application/json" }),
  serve({ client: inngest, functions })
);

// ✅ THEN NORMAL MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ❗ Clerk AFTER inngest
app.use(clerkMiddleware());

// health check
app.get("/", (req, res) => {
  res.send("API running");
});

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT || 5000, () =>
    console.log("Server started")
  );
};


start();