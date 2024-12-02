import { Router } from 'express';
import {
  getProgression,
  updateProgression,
  getProgressionByKana,
} from '../controllers/ProgressionController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { accessControlMiddleware } from '../middlewares/accessControlMiddleware';

const router = Router();

// Récupérer toute la progression d'un utilisateur
router.get('/:userId', authMiddleware, accessControlMiddleware, getProgression);

// Récupérer la progression pour un kana spécifique
router.get('/:userId/:kanaId', authMiddleware, accessControlMiddleware, getProgressionByKana);

// Mettre à jour la progression pour un kana spécifique
router.post('/update', authMiddleware, accessControlMiddleware, updateProgression);

export default router;