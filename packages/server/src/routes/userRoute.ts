import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { accessControlMiddleware } from '../middlewares/accessControlMiddleware';
import {
  assignBadgeToUser,
  getUserBadges,
  getUsers,
  updateUserRole,
} from '../controllers/UserBadgeController';
import upload from '../config/multer';
import {
  getUserProfile,
  updateProfileImage,
} from '../controllers/userController';
import { adminMiddleware } from '../middlewares/adminMiddelware';

const router = Router();

// Routes spécifiques aux utilisateurs
router.get('/list', authMiddleware, adminMiddleware, getUsers);
router.put('/:userId/role', authMiddleware, adminMiddleware, updateUserRole);
router.get(
  '/badges',
  authMiddleware,
  accessControlMiddleware,
  assignBadgeToUser
);
router.get(
  '/badges/:userId',
  authMiddleware,
  accessControlMiddleware,
  getUserBadges
);

// Endpoint pour uploader une image de profil
router.post(
  '/profile/upload',
  authMiddleware,
  accessControlMiddleware,
  upload.single('profileImage'),
  updateProfileImage
);
router.get(
  '/profile/',
  authMiddleware,
  accessControlMiddleware,
  getUserProfile
);

export default router;
