// src/routes/kanaRoutes.ts
import { Router } from 'express';
import {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from '../controllers/CharacterController';
import { adminMiddleware } from '../middlewares/adminMiddelware';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../config/multer';

const router = Router();

router.post(
  '/add',
  authMiddleware,
  adminMiddleware,
  upload.single('media'),
  createCharacter
); // Créer un caractère
router.get('/', authMiddleware, getAllCharacters); // Obtenir tous les caractères
router.get('/:id', authMiddleware, getCharacterById); // Obtenir un caractère par ID
router.put('/:id', authMiddleware, adminMiddleware, updateCharacter); // Mettre à jour un caractère
router.delete('/:id', authMiddleware, adminMiddleware, deleteCharacter); // Supprimer un caractère

export default router;
