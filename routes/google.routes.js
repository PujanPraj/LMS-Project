import express from "express";
import { User, generateAccessToken } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import passport from "passport";
const googleRouter = express.Router();

googleRouter.get(
  "/login/success",
  asyncHandler(async (req, res) => {
    console.log("success");
    if (req.user) {
      const findUser = await User.findOne({ email: req.user.email });
      if (findUser) {
        res.status(200).json({
          status: true,
          message: "login success",
          token: generateAccessToken(findUser?.id),
          role: findUser?.role,
          username: findUser?.firstName + " " + findUser?.lastName,
          user_image: findUser?.userImage,
          from: "google",
        });
      }
    } else {
      throw new Error("Something went wrong");
    }
  })
);

googleRouter.get(
  "/login/error",
  asyncHandler(async (req, res) => {
    res.status(401).json({
      status: false,
      message: "login failed",
    });
  })
);

googleRouter.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

googleRouter.get(
  "/logout",
  asyncHandler(async (req, res) => {
    req.logout();
    res.redirect("/");
  })
);

export default googleRouter;
