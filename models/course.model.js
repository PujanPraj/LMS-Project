import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 350,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 5000,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
    },
    category: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    totalHours: {
      type: String,
      default: 0,
    },
    enrolls: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
