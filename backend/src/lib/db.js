import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) return;

    const conn = await mongoose.connect(ENV.DB_URL, {
      dbName: "test",
    });

    isConnected = true;

    console.log("✅ MongoDB connected");
    console.log("📦 DB NAME:", mongoose.connection.name);

  } catch (error) {
    console.error("❌ DB ERROR:", error);
    throw error;
  }
};