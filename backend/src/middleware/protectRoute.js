import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId, sessionClaims } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("⚡ Creating user on-the-fly");

      user = await User.create({
        clerkId: userId,
        email:
          sessionClaims?.email_addresses?.[0]?.email_address ||
          `${userId}@temp.com`, // ✅ FIXED
        name: sessionClaims?.first_name || "User",
        profileImage: "",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("❌ protectRoute error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};