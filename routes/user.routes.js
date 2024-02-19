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
} from "../controllers/user.controllers.js";
import {
  authMiddleware,
  isAdmin,
  isInstructor,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/:id").get(authMiddleware, getAUser);
router.route("/updateUser").put(authMiddleware, updateUser);
router.route("/:id").delete(authMiddleware, isAdmin, deleteAUser);
router.route("/blockUser/:id").put(authMiddleware, isAdmin, blockUser);
router.route("/unBlockUser/:id").put(authMiddleware, isAdmin, unBlockUser);
router.route("/updatePassword").put(authMiddleware, updatePassword);

export default router;
