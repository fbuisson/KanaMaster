// src/routes/kanaRoutes.ts
import { Router } from 'express';
import {
  createKana,
  getAllKanas,
  getKanaById,
  updateKana,
  deleteKana,
} from '../controllers/KanasController';

const router = Router();

router.post('/', createKana); // Créer un kana
router.get('/', getAllKanas); // Obtenir tous les kanas
router.get('/:id', getKanaById); // Obtenir un kana par ID
router.put('/:id', updateKana); // Mettre à jour un kana
router.delete('/:id', deleteKana); // Supprimer un kana

export default router;
