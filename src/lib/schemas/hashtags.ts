import mongoose from "mongoose";
const hashtagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      required: true,      
    },
    value: {
      type: String,
      required: true,
    },
    key: {
      type: Number,
      required: true,
    },
  },
  { collection: "Hashtags" }
);

export const Hashtags =
  mongoose.models?.Hashtags || mongoose.model("Hashtags", hashtagSchema);
