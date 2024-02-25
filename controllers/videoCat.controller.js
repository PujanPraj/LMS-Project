import { videoCat } from "../models/videoCat.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";
import { validateMongodbId } from "../utils/validateMongoDbId.js";

//create Video category
export const createVideoCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const videoCategory = await videoCat.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Video Category created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all Video categories
export const getAllVideoCategories = asyncHandler(async (req, res) => {
  try {
    const getAllVideoCat = await videoCat.find();
    return res.status(200).json(
      new ApiResponse(200, "Video Categories fetched successfully", {
        TotalCategories: getAllVideoCat.length,
        getAllVideoCat,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get Video category by id
export const getAVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getVideoCat = await videoCat.findById(id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Video Category fetched successfully", getVideoCat)
      );
  } catch (error) {
    throw new Error(error);
  }
});

//update Video category
export const updateAVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const updateVideoCat = await videoCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Video Category updated successfully",
          updateVideoCat
        )
      );
  } catch (error) {
    throw new Error(error);
  }
});

//delete Video category
export const deleteAVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteVideoCat = await videoCat.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "video Category deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
