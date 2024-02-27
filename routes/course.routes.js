import { Router } from "express";
import {
  createCourse,
  getACourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  getParticularInstructorCourse,
} from "../controllers/course.controller.js";
import { authMiddleware, isBoth } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").post(authMiddleware, isBoth, createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getACourse);
router
  .route("/instructor/all-courses")
  .get(authMiddleware, isBoth, getParticularInstructorCourse);
router.route("/:id").put(authMiddleware, isBoth, updateCourse);
router.route("/:id").delete(authMiddleware, isBoth, deleteCourse);

export default router;
