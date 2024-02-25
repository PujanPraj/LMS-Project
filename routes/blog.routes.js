import { Router } from "express";
import {
  deleteBlog,
  getAllBlogs,
  getBlog,
  postBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(authMiddleware, isAdmin, postBlog);
router.route("/:slug").get(getBlog);
router.route("/").get(getAllBlogs);
router.route("/:id").delete(authMiddleware, isAdmin, deleteBlog);
router.route("/:id").put(authMiddleware, isAdmin, updateBlog);

export default router;
