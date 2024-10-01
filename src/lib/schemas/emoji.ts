import mongoose from "mongoose";
const emojiSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { collection: "emoji" }
);

export const Emoji =
  mongoose.models?.Emoji || mongoose.model("Emoji", emojiSchema);
