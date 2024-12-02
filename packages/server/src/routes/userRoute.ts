import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { accessControlMiddleware } from '../middlewares/accessControlMiddleware';
import { assignBadgeToUser, getUserBadges } from '../controllers/UserBadgeController';
import upload from '../config/multer';
import { getUserProfile, updateProfileImage } from '../controllers/userController';

const router = Router();

// Routes spécifiques aux utilisateurs
router.get('/user/badges', authMiddleware, accessControlMiddleware, assignBadgeToUser);
router.get('/user/badges/:userId', authMiddleware, accessControlMiddleware, getUserBadges);


// Endpoint pour uploader une image de profil
router.post('/profile/upload', authMiddleware, accessControlMiddleware, upload.single('profileImage'), updateProfileImage);
router.get('/profile/', authMiddleware, accessControlMiddleware, getUserProfile);
