import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideo,
  postVideo,
  updateVideo,
} from "../controllers/video.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(authMiddleware, isAdmin, postVideo);
router.route("/:slug").get(getVideo);
router.route("/").get(getAllVideos);
router.route("/:id").delete(authMiddleware, isAdmin, deleteVideo);
router.route("/:id").put(authMiddleware, isAdmin, updateVideo);

export default router;
