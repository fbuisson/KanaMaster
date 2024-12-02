import { Router } from 'express';
import {
  getAllBadges,
  createBadge,
  deleteBadge,
} from '../controllers/BadgeController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddelware';

const router = Router();

// Routes générales pour les badges
router.get('/', authMiddleware, adminMiddleware, getAllBadges);
router.post('/', authMiddleware, adminMiddleware, createBadge);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBadge);

export default router;
