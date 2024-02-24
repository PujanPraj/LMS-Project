import { Router } from "express";
import {
  createContact,
  deleteAContact,
  getAContact,
  getAllContacts,
  updateAContact,
} from "../controllers/contact.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authMiddleware, createContact);
router.route("/").get(getAllContacts);
router.route("/:id").get(authMiddleware, isAdmin, getAContact);
router.route("/:id").delete(authMiddleware, isAdmin, deleteAContact);
router.route("/:id").put(authMiddleware, isAdmin, updateAContact);

export default router;
