import { Blog } from "../models/blog.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";

//create Blog
export const postBlog = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const blog = await Blog.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Blog posted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get a Blog
export const getBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug });
    return res.status(200).json(
      new ApiResponse(200, "Blog found!!", {
        blog,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get all Blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(
      new ApiResponse(200, "Blogs fetched successfully", {
        TotalBlogs: blogs.length,
        blogs,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//delete a Blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, "Blog Deleted Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//update a Blog
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Blog Updated Successfully", blog));
  } catch (error) {
    throw new Error(error);
  }
});
