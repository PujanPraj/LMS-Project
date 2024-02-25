import mongoose from "mongoose";

const docSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Developer",
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
    doc_Image: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export const Documentation = mongoose.model("Documentation", docSchema);
