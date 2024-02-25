import express from "express";
import {
  createBlogCategory,
  deleteABlogCategory,
  getABlogCategory,
  getAllBlogCategories,
  updateABlogCategory,
} from "../controllers/blogCat.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, isAdmin, createBlogCategory);
router.route("/").get(getAllBlogCategories);
router.route("/:slug").get(authMiddleware, isAdmin, getABlogCategory);
router.route("/:id").put(authMiddleware, isAdmin, updateABlogCategory);
router.route("/:id").delete(authMiddleware, isAdmin, deleteABlogCategory);

export default router;
