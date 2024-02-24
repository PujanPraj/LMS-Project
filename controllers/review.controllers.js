import { Review } from "../models/review.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";

//create review
export const createReview = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const data = {
      user: _id,
      comment: req.body.comment,
      color: req.body.color,
    };
    const review = await Review.create(data);
    return res
      .status(201)
      .json(new ApiResponse(201, "Review created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all reviews
export const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const getAllReviews = await Review.find().populate("user");
    return res.status(200).json(
      new ApiResponse(200, "Reviews fetched successfully", {
        TotalReviews: getAllReviews.length,
        getAllReviews,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get a review
export const getAReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getReview = await Review.findById(id).populate("user");
    return res.status(200).json(
      new ApiResponse(200, "Review fetched successfully", {
        getReview,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//delete a review
export const deleteAReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteReview = await Review.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Review deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//update a review
export const updateAReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateReview = await Review.findByIdAndUpdate(
      id,
      {
        isApproved: req.body.isApproved,
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, "Review is successfully approved"));
  } catch (error) {
    throw new Error(error);
  }
});
