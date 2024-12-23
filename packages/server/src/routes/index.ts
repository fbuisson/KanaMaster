import { Router } from 'express';
import authRoutes from './authRoute';
import characterRoutes from './characterRoute';
import badgeRoutes from './badgeRoute';
import progressionRoutes from './progressionRoute';
import userRoutes from './userRoute';
import { APIResponse } from '../utils/response';

const router = Router();

// http://localhost:3000/api/auth
router.use('/auth', authRoutes);
router.use('/character', characterRoutes);
router.use('/badge', badgeRoutes);
router.use('/progression', progressionRoutes);
router.use('/user', userRoutes);
router.use('/check', (req, res) => {
  APIResponse(res, 200, 'OK!');
});

export default router;
