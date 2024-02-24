import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    tutorialCategory: {
      type: String,
      required: true,
    },
    tutorialCategorySlug: {
      type: String,
      required: true,
    },
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tutorial = mongoose.model("Tutorial", tutorialSchema);
