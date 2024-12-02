import { Router } from 'express';
import {
  getAllBadges,
  createBadge,
  deleteBadge,
} from '../controllers/BadgeController';
import {
  assignBadgeToUser,
  getUserBadges,
} from '../controllers/UserBadgeController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddelware';
import { accessControlMiddleware } from '../middlewares/accessControlMiddleware';

const router = Router();

// Routes générales pour les badges
router.get('/', authMiddleware, adminMiddleware, getAllBadges);
router.post('/', authMiddleware, adminMiddleware, createBadge);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBadge);

// Routes spécifiques aux utilisateurs
router.post('/user', authMiddleware, accessControlMiddleware, assignBadgeToUser);
router.get('/user/:userId', authMiddleware, accessControlMiddleware, getUserBadges);

export default router;
