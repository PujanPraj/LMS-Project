import { DocCat } from "../models/docCat.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";
import { validateMongodbId } from "../utils/validateMongoDbId.js";

//create doc category
export const createDocCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const docCategory = await DocCat.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "doc Category created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

//get all doc categories
export const getAllDocCategories = asyncHandler(async (req, res) => {
  try {
    const getAllDocCat = await DocCat.find();
    return res.status(200).json(
      new ApiResponse(200, "doc Categories fetched successfully", {
        TotalCategories: getAllDocCat.length,
        getAllDocCat,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//get doc category by id
export const getADocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getDocCat = await DocCat.findById(id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "doc Category fetched successfully", getDocCat)
      );
  } catch (error) {
    throw new Error(error);
  }
});

//update doc category
export const updateADocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title).toLowerCase();
    }
    const updateDocCat = await DocCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "doc Category updated successfully", updateDocCat)
      );
  } catch (error) {
    throw new Error(error);
  }
});

//delete doc category
export const deleteADocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteDocCat = await DocCat.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "doc Category deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});
