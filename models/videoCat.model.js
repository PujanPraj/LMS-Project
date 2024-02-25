import mongoose from "mongoose";

const videoCatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const videoCat = mongoose.model("videoCat", videoCatSchema);
