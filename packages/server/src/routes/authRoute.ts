import { Router } from 'express';
import { register, login, logout, refreshAccessToken, me } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', authMiddleware, me);

export default router;
