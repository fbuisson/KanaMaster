// src/routes/kanaRoutes.ts
import { Router } from 'express';
import {
  createKana,
  getAllKanas,
  getKanaById,
  updateKana,
  deleteKana,
} from '../controllers/KanaController';
import { adminMiddleware } from '../middlewares/adminMiddelware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, createKana); // Créer un kana
router.get('/', authMiddleware, getAllKanas); // Obtenir tous les kanas
router.get('/:id', authMiddleware,getKanaById); // Obtenir un kana par ID
router.put('/:id', authMiddleware, adminMiddleware, updateKana); // Mettre à jour un kana
router.delete('/:id', authMiddleware, adminMiddleware, deleteKana); // Supprimer un kana

export default router;
