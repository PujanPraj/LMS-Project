import { Router } from "express";
import {
  createReview,
  deleteAReview,
  getAllReviews,
  getAReview,
  updateAReview,
} from "../controllers/review.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authMiddleware, createReview);
router.route("/").get(getAllReviews);
router.route("/:id").get(authMiddleware, isAdmin, getAReview);
router.route("/:id").delete(authMiddleware, isAdmin, deleteAReview);
router.route("/:id").put(authMiddleware, isAdmin, updateAReview);

export default router;
