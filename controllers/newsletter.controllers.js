import { Newsletter } from "../models/newsletter.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";

//subscribe to newsletter
export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Newsletter.findOne({ email });
    if (user) {
      throw new Error("You are already subscribed to our newsletter");
    }
    const subscribe = await Newsletter.create(req.body);
    return res.status(201).json(new ApiResponse(201, "Newsletter Subscribed"));
  } catch (error) {
    throw new Error(error);
  }
});

//unsubscribe from newsletter

export const unsubscribe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const unSubscribe = await Newsletter.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Newsletter Unsubscribed"));
  } catch (error) {
    throw new Error(error);
  }
});
