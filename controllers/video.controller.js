import { Video } from "../models/video.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";

//create video
export const postVideo = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const video = await Video.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Video posted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get a video
export const getVideo = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const video = await Video.findOne({ slug });
    return res.status(200).json(
      new ApiResponse(200, "Video found!!", {
        video,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get all videos
export const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find();
    return res.status(200).json(
      new ApiResponse(200, "Videos fetched successfully", {
        TotalVideos: videos.length,
        videos,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//delete a video
export const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Video Deleted Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//update a video
export const updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const video = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Video Updated Successfully", video));
  } catch (error) {
    throw new Error(error);
  }
});
