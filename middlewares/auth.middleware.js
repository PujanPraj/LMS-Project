import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } else {
      throw new Error("Not authorized. Please login again");
    }
  } catch (error) {
    throw new Error("There is no token or token expired");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const isAdmin = await User.findOne({ email });
  if (isAdmin.role !== "admin") {
    throw new Error("Yor are not an Admin");
  } else {
    next();
  }
});

export const isInstructor = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const isInstructor = await User.findOne({ email });
  if (isInstructor.role !== "instructor") {
    throw new Error("Yor are not an Instructor");
  } else {
    next();
  }
});
