import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "inter-vue-official" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "user.created" },
  async ({ event }) => {
    console.log("🔥 user.created event received");

    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    };

    await User.findOneAndUpdate(
      { clerkId: id },
      newUser,
      { upsert: true, new: true }
    );

    await upsertStreamUser({
      id: id.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "user.deleted" },
  async ({ event }) => {
    console.log("🔥 user.deleted event received");

    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];