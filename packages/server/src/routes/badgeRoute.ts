import { Router } from 'express';
import {
  getAllBadges,
  createBadge,
  deleteBadge,
} from '../controllers/BadgesController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddelware';
import upload from '../config/multer';

const router = Router();

// Routes générales pour les badges
router.get('/', authMiddleware, adminMiddleware, getAllBadges);
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('media'),
  createBadge
);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBadge);

export default router;
