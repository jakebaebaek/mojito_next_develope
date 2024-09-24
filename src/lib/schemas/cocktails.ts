import mongoose from "mongoose";
const cocktailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    base: {
      type: [String],
    },
    flavor: {
      type: [String],
    },
    booziness: {
      type: Number,
    },
    sweetness: {
      type: Number,
    },
    hashtag: {
      type: [String],
    },
  },
  { collection: "Cocktails" }
);

export const Cocktails =
  mongoose.models?.Cocktails || mongoose.model("Cocktails", cocktailsSchema);
