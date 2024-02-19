import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
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
router.route("/updateUser").put(authMiddleware, updateUser);

export default router;
