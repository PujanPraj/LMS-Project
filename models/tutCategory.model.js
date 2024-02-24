import mongoose from "mongoose";

const tutCategoryModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const TutorialCategory = mongoose.model(
  "TutorialCategory",
  tutCategoryModel
);
