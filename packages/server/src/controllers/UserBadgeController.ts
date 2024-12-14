import { Request, Response } from 'express';
import UserBadge from '../models/UserBadge';
import Badge from '../models/Badge';
import Progression, { IProgression } from '../models/Progression';
import { APIResponse } from '../utils/response';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return APIResponse(res, users, 'Liste des utilisateurs', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { role });
    return APIResponse(res, null, 'Rôle utilisateur mis à jour', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

export const assignBadgeToUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const progressionDoc = await Progression.findOne({ user_id });

    if (!progressionDoc) {
      return APIResponse(res, null, 'Progression utilisateur introuvable', 404);
    }

    const userProgression = progressionDoc.toObject() as IProgression;
    const badges = await Badge.find();

    for (const badge of badges) {
      const { type, threshold } = badge.requirements;

      let meetsRequirements = false;

      if (type === 'all') {
        const totalProgression = Object.values(userProgression).reduce(
          (sum, value) => sum + value,
          0
        );
        meetsRequirements = totalProgression >= threshold;
      } else {
        meetsRequirements =
          userProgression[type as keyof IProgression] >= threshold;
      }

      if (meetsRequirements) {
        const existing = await UserBadge.findOne({
          user_id,
          badge_id: badge._id,
        });
        if (!existing) {
          const userBadge = new UserBadge({ user_id, badge_id: badge._id });
          await userBadge.save();
        }
      }
    }

    return APIResponse(
      res,
      null,
      'Badges vérifiés et attribués si nécessaire',
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

export const getUserBadges = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userBadges = await UserBadge.find({ user_id: userId }).populate(
      'badge_id'
    );
    return APIResponse(
      res,
      userBadges,
      "Liste des badges de l'utilisateur",
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};
