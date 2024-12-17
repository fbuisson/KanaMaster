import { Request, Response } from 'express';
import UserBadge from '../models/UserBadge';
import Badge from '../models/Badge';
import Progression from '../models/Progression';
import { APIResponse } from '../utils/response';
import User from '../models/User';
import mongoose from 'mongoose';

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
    const { userId } = req.params;

    const objectId = new mongoose.Types.ObjectId(String(userId));

    const progressionDocs = await Progression.find({
      user_id: objectId,
    });

    if (!progressionDocs || progressionDocs.length === 0) {
      return APIResponse(res, null, 'Progression utilisateur introuvable', 404);
    }

    const badges = await Badge.find();
    let assignedBadgesCount = 0;

    for (const badge of badges) {
      const { type, threshold } = badge.requirements;

      let meetsRequirements = false;

      if (type === 'all') {
        const totalAttempts = progressionDocs.reduce(
          (sum, doc) => sum + doc.attempts,
          0
        );
        const totalCorrectAttempts = progressionDocs.reduce(
          (sum, doc) => sum + doc.correct_attempts,
          0
        );
        const successPercentage = (totalCorrectAttempts / totalAttempts) * 100;

        meetsRequirements =
          totalAttempts >= threshold.attempts &&
          successPercentage >= threshold.percentage;
      } else if (type === 'kana') {
        const kanaProgressions = progressionDocs.filter(
          (doc) =>
            doc.character_type === 'hiragana' ||
            doc.character_type === 'katakana'
        );

        const totalKanaAttempts = kanaProgressions.reduce(
          (sum, doc) => sum + doc.attempts,
          0
        );
        const totalKanaCorrectAttempts = kanaProgressions.reduce(
          (sum, doc) => sum + doc.correct_attempts,
          0
        );
        const kanaSuccessPercentage =
          (totalKanaCorrectAttempts / totalKanaAttempts) * 100;

        meetsRequirements =
          kanaProgressions.length >= threshold.number &&
          totalKanaAttempts >= threshold.attempts &&
          kanaSuccessPercentage >= threshold.percentage;
      } else {
        const progression = progressionDocs.find(
          (doc) => doc.character_type === type
        );

        if (progression) {
          const successPercentage =
            (progression.correct_attempts / progression.attempts) * 100;

          meetsRequirements =
            progression.attempts >= threshold.attempts &&
            successPercentage >= threshold.percentage;
        }
      }

      if (meetsRequirements) {
        const existing = await UserBadge.findOne({
          user_id: objectId,
          badge_id: badge._id,
        });
        if (!existing) {
          const userBadge = new UserBadge({
            user_id: objectId,
            badge_id: badge._id,
          });
          await userBadge.save();
          assignedBadgesCount++;
        }
      }
    }

    return APIResponse(
      res,
      { count: assignedBadgesCount },
      `${assignedBadgesCount} nouveau(x) badge(s) attribué(s)`,
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

    const formattedUserBadges = userBadges.map((userBadge) => ({
      _id: userBadge._id,
      user_id: userBadge.user_id,
      badge: userBadge.badge_id,
      date_awarded: userBadge.date_awarded,
    }));
    return APIResponse(
      res,
      formattedUserBadges,
      "Liste des badges de l'utilisateur",
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};
