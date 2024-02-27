import { courseCat } from "../models/courseCategory.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";
import { validateMongodbId } from "../utils/validateMongoDbId.js";

//create Course category
export const createCourseCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const courseCategory = await courseCat.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Course Category created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all Course categories
export const getAllCourseCategories = asyncHandler(async (req, res) => {
  try {
    const getAllCourse = await courseCat.find();
    return res.status(200).json(
      new ApiResponse(200, "Course Categories fetched successfully", {
        TotalCategories: getAllCourse.length,
        getAllCourse,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get Course category by id
export const getACourseCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const getCourse = await courseCat.findOne({ slug });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Course Category fetched successfully", getCourse)
      );
  } catch (error) {
    throw new Error(error);
  }
});

//update Course category
export const updateACourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const updateCourse = await courseCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Course Category updated successfully",
          updateCourse
        )
      );
  } catch (error) {
    throw new Error(error);
  }
});

//delete Course category
export const deleteACourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteCourse = await courseCat.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "course Category deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
