import { Documentation } from "../models/documentation.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";

//create Doc
export const postDoc = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const doc = await Documentation.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "Documentation posted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get a Doc
export const getDoc = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const doc = await Documentation.findOne({ slug });
    return res.status(200).json(
      new ApiResponse(200, "Documentation found!!", {
        doc,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get all Docs
export const getAllDocs = asyncHandler(async (req, res) => {
  try {
    const docs = await Documentation.find();
    return res.status(200).json(
      new ApiResponse(200, "Documentation fetched successfully", {
        TotalDocs: docs.length,
        docs,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//delete a Doc
export const deleteDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Documentation.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiResponse(200, "Documentation Deleted Successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//update a Doc
export const updateDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const doc = await Documentation.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Documentation Updated Successfully", doc));
  } catch (error) {
    throw new Error(error);
  }
});
