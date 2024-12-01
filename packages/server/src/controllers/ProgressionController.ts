import { Request, Response } from 'express';
import Progression from '../models/Progression';
import { APIResponse } from '../utils/response';

export const getProgression = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Récupérer toute la progression de l'utilisateur
    const progression = await Progression.find({ user_id: userId }).populate('kana_id');
    return APIResponse(res, progression, 'Progression utilisateur récupérée avec succès', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur lors de la récupération de la progression', 500);
  }
};

export const updateProgression = async (req: Request, res: Response) => {
    try {
      const { userId, kanaId, isCorrect } = req.body;
  
      // Trouver ou initialiser la progression
      const progression = await Progression.findOneAndUpdate(
        { user_id: userId, kana_id: kanaId },
        {
          $inc: {
            attempts: 1,
            correct_attempts: isCorrect ? 1 : 0,
          },
        },
        { new: true, upsert: true }
      );
  
      // Mettre à jour le statut en fonction des critères de maîtrise
      const masteryThreshold = 5; // Par exemple, 5 réponses correctes
      const accuracyThreshold = 0.8; // 80 % de précision
  
      const accuracy = progression.correct_attempts / progression.attempts;
  
      if (progression.correct_attempts >= masteryThreshold && accuracy >= accuracyThreshold) {
        progression.status = 'mastered';
      } else if (progression.correct_attempts > 0) {
        progression.status = 'learning';
      }
  
      await progression.save();
  
      return APIResponse(res, progression, 'Progression mise à jour avec succès', 200);
    } catch (error) {
      console.error(error);
      return APIResponse(res, null, 'Erreur serveur lors de la mise à jour de la progression', 500);
    }
  };

  export const getProgressionByKana = async (req: Request, res: Response) => {
    try {
      const { userId, kanaId } = req.params;
  
      // Trouver la progression pour le kana spécifique
      const progression = await Progression.findOne({ user_id: userId, kana_id: kanaId }).populate('kana_id');
  
      if (!progression) {
        return APIResponse(res, null, 'Aucune progression trouvée pour ce kana', 404);
      }
  
      return APIResponse(res, progression, 'Progression du kana récupérée avec succès', 200);
    } catch (error) {
      console.error(error);
      return APIResponse(res, null, 'Erreur serveur lors de la récupération de la progression du kana', 500);
    }
  };
  
  