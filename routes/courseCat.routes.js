import express from "express";
import {
  createCourseCategory,
  deleteACourseCategory,
  getACourseCategory,
  getAllCourseCategories,
  updateACourseCategory,
} from "../controllers/courseCat.controller.js";
import {
  authMiddleware,
  isAdmin,
  isBoth,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, isBoth, createCourseCategory);
router.route("/").get(getAllCourseCategories);
router.route("/:slug").get(authMiddleware, isBoth, getACourseCategory);
router.route("/:id").put(authMiddleware, isBoth, updateACourseCategory);
router.route("/:id").delete(authMiddleware, isBoth, deleteACourseCategory);

export default router;
