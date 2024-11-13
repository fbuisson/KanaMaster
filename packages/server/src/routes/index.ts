import { Router } from "express";
import authRoutes from "./AuthRoutes";

const router = Router();

// http://localhost:3000/api/auth
router.use("/auth", authRoutes);


export default router;