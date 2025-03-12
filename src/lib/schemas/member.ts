import mongoose from "mongoose";
const memberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const memberStoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member_list",
      required: true,
    },
    heart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cocktails",
        required: true,
      },
    ],
    memo: [
      {
        cocktail_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cocktails",
          required: true,
        },
        memo_txt: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Member =
  mongoose.models?.Member_list || mongoose.model("Member_list", memberSchema);

export const MemberStore =
  mongoose.models?.Member_store ||
  mongoose.model("Member_store", memberStoreSchema);
