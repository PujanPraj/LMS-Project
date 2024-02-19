import {
  User,
  generateAccessToken,
  generateRefreshToken,
} from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validateMongodbId } from "../utils/validateMongoDbId.js";

//register user
export const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const createUser = await User.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", createUser));
  } else {
    throw new Error("User already exists");
  }
});

//login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new Error("Email and password are required");
  }

  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const accessToken = await generateAccessToken(findUser._id);
    const refreshToken = await generateRefreshToken(findUser._id);

    const options = {
      secure: true,
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "LoggedIn successfull", {
          username: findUser?.firstName + " " + findUser?.lastName,
          role: findUser?.role,
          user_image: findUser?.userImage,
          accessToken,
        })
      );
  } else {
    throw new Error("Invalid credentials");
  }
});

//get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(
      new ApiResponse(200, "Users fetched successfully", {
        TotalUsers: allUsers.length,
        allUsers,
      })
    );
  } catch (error) {
    throw new Error(error);
  }
});

//update user profile
export const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "User updated successfully", user));
  } catch (error) {
    throw new Error(error);
  }
});
