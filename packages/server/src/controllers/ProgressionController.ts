import { Request, Response } from 'express';
import Progression from '../models/Progression';
import { APIResponse } from '../utils/response';
import Character from '../models/Character';
import User from '../models/User';

export const getProgression = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Récupérer toute la progression de l'utilisateur
    const progression = await Progression.find({ user_id: userId }).populate(
      'kana_id'
    );
    return APIResponse(
      res,
      progression,
      'Progression utilisateur récupérée avec succès',
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(
      res,
      null,
      'Erreur serveur lors de la récupération de la progression',
      500
    );
  }
};

export const createProgression = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { characters } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return APIResponse(res, null, 'Utilisateur non trouvé', 404);
    }

    for (const { character, isCorrect } of characters) {
      const c = await Character.findById(character._id);
      if (!c) {
        return APIResponse(res, null, 'Caractère non trouvé', 404);
      }

      // Trouver ou créer une progression
      await Progression.findOneAndUpdate(
        { user_id: userId, character_id: character._id },
        {
          $inc: {
            attempts: 1,
            correct_attempts: isCorrect ? 1 : 0,
          },
          $setOnInsert: {
            character_type: character.type,
          },
        },
        { new: true, upsert: true }
      );
    }

    return APIResponse(res, null, 'Progression créée avec succès', 201);
  } catch (error) {
    console.error(error);
    return APIResponse(
      res,
      null,
      'Erreur serveur lors de la création de la progression',
      500
    );
  }
};

export const getProgressionByKana = async (req: Request, res: Response) => {
  try {
    const { userId, kanaId } = req.params;

    // Trouver la progression pour le kana spécifique
    const progression = await Progression.findOne({
      user_id: userId,
      kana_id: kanaId,
    }).populate('kana_id');

    if (!progression) {
      return APIResponse(
        res,
        null,
        'Aucune progression trouvée pour ce kana',
        404
      );
    }

    return APIResponse(
      res,
      progression,
      'Progression du kana récupérée avec succès',
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(
      res,
      null,
      'Erreur serveur lors de la récupération de la progression du kana',
      500
    );
  }
};
