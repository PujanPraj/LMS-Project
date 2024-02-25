import mongoose from "mongoose";

const blogCatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const blogCat = mongoose.model("BlogCat", blogCatSchema);
