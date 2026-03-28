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
      console.log("🔥 clerk/user.created event received");

      await connectDB();

      const {
        id,
        email_addresses,
        primary_email_address_id,
        first_name,
        last_name,
        image_url,
      } = event.data;

      const primaryEmailObj = email_addresses?.find(
        (e) => e.id === primary_email_address_id
      );

      const email =
        primaryEmailObj?.email_address ||
        email_addresses?.[0]?.email_address ||
        `user-${id}@intervue.dev`;

      const newUser = {
        clerkId: id,
        email,
        name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
        profileImage: image_url || "",
      };

      const savedUser = await User.findOneAndUpdate(
        { clerkId: id },
        newUser,
        { upsert: true, new: true }
      );

      console.log("✅ User saved in MongoDB:", savedUser);

      await upsertStreamUser({
        id: id.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });

    } catch (error) {
      console.error("❌ syncUser error:", error);
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