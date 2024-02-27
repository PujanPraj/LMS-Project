import { Course } from "../models/course.model.js";
import asyncHandler from "express-async-handler";
import { validateMongodbId } from "../utils/validateMongoDbId.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";

//create a new course
export const createCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const course = await Course.create(req.body);
    res.status(200).json(new ApiResponse(200, "Course Created Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all Courses
export const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const getAllCourses = await Course.find();
    res.status(200).json(
      new ApiResponse(200, "Courses fetched successfully", {
        TotalCourses: getAllCourses.length,
        getAllCourses,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get a single course
export const getACourse = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const getCourse = await Course.findOne({ slug });
    res.status(200).json(
      new ApiResponse(200, "Course fetched successfully", {
        getCourse,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get a particular instructor course
export const getParticularInstructorCourse = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const courses = await Course.findOne({ instructor: _id });
    res.status(200).json(
      new ApiResponse(200, "Course fetched successfully", {
        courses,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//update Courses
export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(new ApiResponse(200, "Course Updated Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//delete a course
export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const course = await Course.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Course Deleted Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
