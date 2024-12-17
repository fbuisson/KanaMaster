// src/controllers/BadgeController.ts
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { APIResponse } from '../utils/response';
import Badge from '../models/Badges';

// Créer un nouveau badge
export const createBadge = async (req: Request, res: Response) => {
  try {
    const { title, description, type, number, attempts, percentage } = req.body;
    const file = req.file;
    const requirements = {
      type,
      threshold: {
        number,
        attempts,
        percentage,
      },
    };

    if (!file) {
      return APIResponse(res, null, 'Image non téléchargée', 400);
    }

    // Create a new badge without the media field first
    const newBadge = new Badge({
      title,
      description,
      type,
      requirements,
      media: file.filename,
    });
    await newBadge.save();

    // Define the directory path based on badge ID
    const dirPath = path.join(
      __dirname,
      '../../uploads/badges',
      newBadge.id.toString()
    );

    // Ensure the directory exists
    fs.mkdirSync(dirPath, { recursive: true });

    // Move the file to the correct directory
    const filePath = path.join(dirPath, file.filename);
    fs.renameSync(file.path, filePath);

    // Update the badge with the media file name
    newBadge.media = file.filename;
    await newBadge.save();

    return APIResponse(res, null, 'Badge créé avec succès', 201);
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

export const deleteBadge = async (
  req: Request,
  res: Response
): Promise<void> => {
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
