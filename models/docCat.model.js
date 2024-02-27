import mongoose from "mongoose";

const docCatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DocCat = mongoose.model("DocCat", docCatSchema);
