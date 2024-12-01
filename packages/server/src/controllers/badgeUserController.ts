import { Request, Response } from 'express';
import UserBadge from '../models/badgeUser';
import { APIResponse } from '../utils/response';

export const assignBadgeToUser = async (req: Request, res: Response) => {
  try {
    const { user_id, badge_id } = req.body;

    // Vérifie si l'utilisateur a déjà le badge
    const existing = await UserBadge.findOne({ user_id, badge_id });
    if (existing) {
      return APIResponse(res, null, 'Badge déjà attribué à l\'utilisateur', 400);
    }

    const userBadge = new UserBadge({ user_id, badge_id });
    await userBadge.save();

    return APIResponse(res, userBadge, 'Badge attribué avec succès', 201);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

export const getUserBadges = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const userBadges = await UserBadge.find({ user_id: userId }).populate('badge_id');
      return APIResponse(res, userBadges, 'Liste des badges de l\'utilisateur', 200);
    } catch (error) {
      console.error(error);
      return APIResponse(res, null, 'Erreur serveur', 500);
    }
};
