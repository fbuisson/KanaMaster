// src/controllers/badgeController.ts
import { Request, Response } from 'express';
import Badge from '../models/Badge';
import { APIResponse } from '../utils/response';

// Créer un nouveau badge
export const createBadge = async (req: Request, res: Response) => {
  try {
    const { title, description, media_url, requirements } = req.body;
    const newBadge = new Badge({ title, description, media_url, requirements });
    await newBadge.save();

    return APIResponse(res, newBadge, 'Badge créé avec succès', 201);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Obtenir tous les badges
export const getAllBadges = async (req: Request, res: Response) => {
  try {
    const badges = await Badge.find();
    return APIResponse(res, badges, 'Liste des badges', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

export const deleteBadge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const badge = await Badge.findByIdAndDelete(id);
    if (!badge) {
      APIResponse(res, null, 'Badge introuvable', 404);
      return;
    }

    APIResponse(res, null, 'Badge supprimé avec succès', 200);
  } catch (error) {
    console.error(error);
    APIResponse(res, null, 'Erreur serveur', 500);
  }
};
