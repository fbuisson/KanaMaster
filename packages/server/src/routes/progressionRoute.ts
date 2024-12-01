import { Router } from 'express';
import {
  getProgression,
  updateProgression,
  getProgressionByKana,
} from '../controllers/ProgressionController';

const router = Router();

// Récupérer toute la progression d'un utilisateur
router.get('/:userId', getProgression);

// Récupérer la progression pour un kana spécifique
router.get('/:userId/:kanaId', getProgressionByKana);

// Mettre à jour la progression pour un kana spécifique
router.post('/update', updateProgression);

export default router;