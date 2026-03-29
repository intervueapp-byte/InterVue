import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

// ✅ 1. Middleware
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

// 🔥 2. INNGEST ROUTE FIRST (VERY IMPORTANT)
// 🔥 2. INNGEST ROUTE (PUBLIC - NO CLERK BLOCK)
app.use("/api/inngest", serve({ client: inngest, functions }));

// 🔥 3. Clerk AFTER inngest
app.use(clerkMiddleware());
// 🔥 3. Clerk middleware with BYPASS for inngest
app.use((req, res, next) => {
  if (req.path.startsWith("/api/inngest")) {
    return next(); // ✅ allow Inngest requests
  }
  return clerkMiddleware()(req, res, next);
});

// ✅ 4. Health check
app.get("/health", (req, res) => {
res.status(200).json({ msg: "API is running" });
});

// ✅ 5. Routes
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// ✅ 6. Global error handler (prevents crash)
app.use((err, req, res, next) => {
console.error("❌ Server Error:", err);
res.status(500).json({
message: "Internal Server Error",
error: err.message,
});
});

// ✅ 7. Start server safely
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
startServer()