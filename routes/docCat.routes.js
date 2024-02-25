import express from "express";
import {
  createDocCategory,
  deleteADocCategory,
  getADocCategory,
  getAllDocCategories,
  updateADocCategory,
} from "../controllers/docCat.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, isAdmin, createDocCategory);
router.route("/").get(getAllDocCategories);
router.route("/:slug").get(authMiddleware, isAdmin, getADocCategory);
router.route("/:id").put(authMiddleware, isAdmin, updateADocCategory);
router.route("/:id").delete(authMiddleware, isAdmin, deleteADocCategory);

export default router;
