import express from "express";
import {
  createVideoCategory,
  deleteAVideoCategory,
  getAVideoCategory,
  getAllVideoCategories,
  updateAVideoCategory,
} from "../controllers/videoCat.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, isAdmin, createVideoCategory);
router.route("/").get(getAllVideoCategories);
router.route("/:slug").get(authMiddleware, isAdmin, getAVideoCategory);
router.route("/:id").put(authMiddleware, isAdmin, updateAVideoCategory);
router.route("/:id").delete(authMiddleware, isAdmin, deleteAVideoCategory);

export default router;
