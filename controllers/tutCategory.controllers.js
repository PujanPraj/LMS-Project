import { TutorialCategory } from "../models/tutCategory.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";
import { validateMongodbId } from "../utils/validateMongoDbId.js";

//create tutorial category
export const createTutorialCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const tutCategory = await TutorialCategory.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Tutorial Category created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all tutorial categories
export const getAllTutorialCategories = asyncHandler(async (req, res) => {
  try {
    const getAllTutCat = await TutorialCategory.find();
    return res.status(200).json(
      new ApiResponse(200, "Tutorial Categories fetched successfully", {
        TotalCategories: getAllTutCat.length,
        getAllTutCat,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get tutorial category by id
export const getATutorialCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getTutCat = await TutorialCategory.findById(id);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Tutorial Category fetched successfully",
          getTutCat
        )
      );
  } catch (error) {
    throw new Error(error);
  }
});

//update tutorial category
export const updateATutorialCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const updateTutCat = await TutorialCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Tutorial Category updated successfully",
          updateTutCat
        )
      );
  } catch (error) {
    throw new Error(error);
  }
});

//delete tutorial category
export const deleteATutorialCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteTutCat = await TutorialCategory.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Tutorial Category deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
