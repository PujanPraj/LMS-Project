import { Router } from "express";
import {
  deleteDoc,
  getAllDocs,
  getDoc,
  postDoc,
  updateDoc,
} from "../controllers/documentation.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(authMiddleware, isAdmin, postDoc);
router.route("/:slug").get(getDoc);
router.route("/").get(getAllDocs);
router.route("/:id").delete(authMiddleware, isAdmin, deleteDoc);
router.route("/:id").put(authMiddleware, isAdmin, updateDoc);

export default router;
