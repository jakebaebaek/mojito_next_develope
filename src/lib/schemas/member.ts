import mongoose from "mongoose";
const memberListSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const memberStoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member_list",
    required: true,
  },
  store: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cocktails",
    },
    { timestamps: true },
  ],
});

export const MemberList =
  mongoose.models?.Member_list ||
  mongoose.model("Member_list", memberListSchema);

export const MemberStore =
  mongoose.models?.Member_store ||
  mongoose.model("Member_store", memberStoreSchema);
