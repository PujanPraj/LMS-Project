import { Router } from "express";
import {
  createTutorial,
  getATutorials,
  updateATutorial,
  deleteTutorial,
  getAllTutorials,
} from "../controllers/tutorial.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/createTutorial").post(authMiddleware, isAdmin, createTutorial);
router.route("/:type/:slug").get(getATutorials);
router.route("/:id").put(authMiddleware, isAdmin, updateATutorial);
router.route("/:id").delete(authMiddleware, isAdmin, deleteTutorial);
router.route("/getAllTutorials").get(authMiddleware, isAdmin, getAllTutorials);

export default router;
