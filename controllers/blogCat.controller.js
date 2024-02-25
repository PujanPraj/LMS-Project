import { blogCat } from "../models/blogCat.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";
import { validateMongodbId } from "../utils/validateMongoDbId.js";

//create blog category
export const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const blogCategory = await blogCat.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "blog Category created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all blog categories
export const getAllBlogCategories = asyncHandler(async (req, res) => {
  try {
    const getAllBlog = await blogCat.find();
    return res.status(200).json(
      new ApiResponse(200, "blog Categories fetched successfully", {
        TotalCategories: getAllBlog.length,
        getAllBlog,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get blog category by id
export const getABlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getBlog = await blogCat.findById(id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "blog Category fetched successfully", getBlog)
      );
  } catch (error) {
    throw new Error(error);
  }
});

//update blog category
export const updateABlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const updateBlog = await blogCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "blog Category updated successfully", updateBlog)
      );
  } catch (error) {
    throw new Error(error);
  }
});

//delete blog category
export const deleteABlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteBlog = await blogCat.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "doc Category deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
