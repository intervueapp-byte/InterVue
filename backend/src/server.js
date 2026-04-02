import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import codeRoutes from "./routes/codeRoutes.js";

const app = express();

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

app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
res.status(200).json({ msg: "API is running" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/code", codeRoutes);

app.use((err, req, res, next) => {
console.error("Server Error:", err);
res.status(500).json({
message: "Internal Server Error",
error: err.message,
});
});

const PORT = process.env.PORT || ENV.PORT || 5000;

const startServer = async () => {
try {
await connectDB();
console.log("MongoDB connected");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

} catch (error) {
console.error("Failed to start server:", error);
process.exit(1);
}
};

startServer();
