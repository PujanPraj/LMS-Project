import { Tutorial } from "../models/tutorial.model.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validateMongoDbId.js";
import slugify from "slugify";
import { ApiResponse } from "../utils/ApiResponse.js";

//create a new tutorial
export const createTutorial = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory
      ).toLowerCase();
    }

    const postTut = await Tutorial.create(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, "Successfully created tutorial"));
  } catch (error) {
    throw new Error(error);
  }
});

//get a tutorials
export const getATutorials = asyncHandler(async (req, res) => {
  const { type, slug } = req.params;
  try {
    const getATutData = await Tutorial.findOne({
      slug: slug,
      tutorialCategorySlug: type,
    });
    const tutorialTopics = await Tutorial.find({ tutorialCategorySlug: type })
      .select("topicName title slug tutorialCategorySlug")
      .sort("createdAt");

    return res.status(200).json(
      new ApiResponse(200, "Successfully fetched tutorials", {
        getATutData,
        tutorialTopics,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//update a tutorial
export const updateATutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory
      ).toLowerCase();
    }

    const updateTutorial = await Tutorial.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Tutorial Updated Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//delete a tutorial
export const deleteTutorial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTut = await Tutorial.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Tutorial Deleted Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all tutorial
export const getAllTutorials = asyncHandler(async (req, res) => {
  try {
    const getAllTut = await Tutorial.find();
    return res.status(200).json(
      new ApiResponse(200, "Tutorials fetched successfully", {
        TotalTutorials: getAllTut.length,
        getAllTut,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});
