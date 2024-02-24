import express from "express";
import {
  createTutorialCategory,
  deleteATutorialCategory,
  getATutorialCategory,
  getAllTutorialCategories,
  updateATutorialCategory,
} from "../controllers/tutCategory.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router
  .route("/createTutCategory")
  .post(authMiddleware, isAdmin, createTutorialCategory);
router.route("/getAllTutorialCategories").get(getAllTutorialCategories);
router.route("/:id").get(authMiddleware, isAdmin, getATutorialCategory);
router.route("/:id").put(authMiddleware, isAdmin, updateATutorialCategory);
router.route("/:id").delete(authMiddleware, isAdmin, deleteATutorialCategory);

export default router;
