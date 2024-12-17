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

    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return APIResponse(res, null, 'Utilisateur non trouvé', 404);
    }

    // Define the directory path based on user ID
    const dirPath = path.join(__dirname, '../../uploads/users', userId);

    // Ensure the directory exists
    fs.mkdirSync(dirPath, { recursive: true });

    // Remove the old image if it exists and is not the default
    if (user.media) {
      const oldImagePath = path.join(dirPath, user.media);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Move the new file to the correct directory
    const filePath = path.join(dirPath, req.file.filename);
    fs.renameSync(req.file.path, filePath);

    // Update the user with the new image file name
    user.media = req.file.filename;
    await user.save();

    return APIResponse(
      res,
      { media: user.media },
      'Image de profil mise à jour avec succès',
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(
      res,
      null,
      "Erreur lors de la mise à jour de l'image",
      500
    );
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return APIResponse(res, null, 'Utilisateur non trouvé', 404);
    }

    return APIResponse(
      res,
      {
        username: user.username,
        email: user.email,
        role: user.role,
        media: user.media,
      },
      'Image de profil récupérée avec succès',
      200
    );
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};
