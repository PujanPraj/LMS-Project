import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
  deleteAUser,
  getAUser,
  blockUser,
  unBlockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/user.controllers.js";
import {
  authMiddleware,
  isAdmin,
  isInstructor,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

//all post routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotPassword").post(forgotPasswordToken);

//all get routes
router.route("/getAllUsers").get(getAllUsers);
router.route("/:id").get(authMiddleware, getAUser);

//all put routes
router.route("/updateUser").put(authMiddleware, updateUser);
router.route("/blockUser/:id").put(authMiddleware, isAdmin, blockUser);
router.route("/unBlockUser/:id").put(authMiddleware, isAdmin, unBlockUser);
router.route("/updatePassword").put(authMiddleware, updatePassword);
router.route("/resetPassword/:token").put(resetPassword);

//all delete routes
router.route("/:id").delete(authMiddleware, isAdmin, deleteAUser);

export default router;
