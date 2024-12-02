import { Request, Response } from 'express';
import User from '../models/User';
import { APIResponse } from '../utils/response';
import fs from 'fs';
import path from 'path';

export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return APIResponse(res, null, 'Aucun fichier uploadé', 400);
    }

    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return APIResponse(res, null, 'Utilisateur non trouvé', 404);
    }

    // Supprime l'ancienne image si elle existe et n'est pas la valeur par défaut
    if (user.image && user.image !== 'https://via.placeholder.com/150') {
      const oldImagePath = path.join(__dirname, '../../uploads/profiles', user.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Met à jour le chemin de la nouvelle image dans la base de données
    user.image = req.file.filename;
    await user.save();

    return APIResponse(res, { image: user.image }, 'Image de profil mise à jour avec succès', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur lors de la mise à jour de l\'image', 500);
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
      const {userId} = req.body;
      const user = await User.findById(userId);
  
      if (!user) {
        return APIResponse(res, null, 'Utilisateur non trouvé', 404);
      }
  
      // Construit l'URL complète de l'image si elle est stockée localement
      const imageUrl = user.image.startsWith('http')
        ? user.image
        : `${req.protocol}://${req.get('host')}/uploads/profiles/${user.image}`;
  
      return APIResponse(res, {
        username: user.username,
        email: user.email,
        role: user.role,
        image: imageUrl,
      }, 'Image de profil récupérée avec succès', 200);
    } catch (error) {
      console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};
