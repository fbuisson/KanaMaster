import { Router } from "express";
import authRoutes from "./authRoute";
import kanaRoutes from "./kanaRoute";
import badgeRoutes from "./badgeRoute";
import progressionRoutes from "./progressionRoute";

const router = Router();

// http://localhost:3000/api/auth
router.use("/auth", authRoutes);
router.use("/kana", kanaRoutes);
router.use("/badge", badgeRoutes);
router.use("/progression", progressionRoutes);

export default router;