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

const router = Router();

// Routes générales pour les badges
router.get('/', getAllBadges);
router.post('/', createBadge);
router.delete('/:id', deleteBadge);

// Routes spécifiques aux utilisateurs
router.post('/user', assignBadgeToUser);
router.get('/user/:userId', getUserBadges);

export default router;
