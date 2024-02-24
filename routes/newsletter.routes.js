import { Router } from "express";
import {
  subscribe,
  unsubscribe,
} from "../controllers/newsletter.controllers.js";
const router = Router();

router.route("/").post(subscribe);
router.route("/:id").delete(unsubscribe);

export default router;
