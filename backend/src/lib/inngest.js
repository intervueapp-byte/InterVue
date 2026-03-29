import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "inter-vue-official" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      console.log("🔥 FUNCTION STARTED");

      await connectDB();
      console.log("🔥 DB CONNECTED");

      const data = event.data;
      console.log("🧾 RAW EVENT:", data);

      const id = data.id;
      const email = data.email_addresses?.[0]?.email_address;


      if (!id || !email) {
        console.log("❌ MISSING ID OR EMAIL → EXITING");
        return;
      }

      const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
          clerkId: id,
          email: email,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          profileImage: data.image_url || "",
        },
        { upsert: true, new: true }
      );

      console.log("✅ SAVED USER:", user);

            console.log("📤 Sending to Stream:", {
  id,
  name: user.name,
  image: user.profileImage,
});
      // 🔥 Stream user creation
      await upsertStreamUser({
        id: id,
        name: user.name,
        image: user.profileImage,
      });

      console.log("🚀 STREAM USER CREATED");

    } catch (err) {
      console.error("❌ ERROR:", err);
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      console.log("🔥 clerk/user.deleted event received");

      await connectDB();

      const { id } = event.data;

      await User.deleteOne({ clerkId: id });

      await deleteStreamUser(id.toString());

      console.log("✅ User deleted");
    } catch (error) {
      console.error("❌ deleteUser error:", error);
    }
  }
);


export const functions = [syncUser, deleteUserFromDB];