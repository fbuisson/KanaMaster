import { Router } from "express";
import authRoutes from "./AuthRoutes";
import kanaRoutes from "./KanasRoutes";
const router = Router();

// http://localhost:3000/api/auth
router.use("/auth", authRoutes);
router.use("/kanas", kanaRoutes);


export default router;