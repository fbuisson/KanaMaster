// src/controllers/CharacterController.ts
import { Request, Response } from 'express';
import Character from '../models/Character';
import { APIResponse } from '../utils/response';

// Créer un nouveau caractère
export const createCharacter = async (req: Request, res: Response) => {
  try {
    const { symbol, type, media_url } = req.body;
    const newCharacter = new Character({ symbol, type, media_url });
    await newCharacter.save();

    return APIResponse(res, newCharacter, 'Caractère créé avec succès', 201);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Obtenir tous les caractères
export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await Character.find();
    return APIResponse(res, characters, 'Liste des caractères', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Obtenir un caractère par ID
export const getCharacterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);

    if (!character) {
      return APIResponse(res, null, 'Caractère non trouvé', 404);
    }

    return APIResponse(res, character, 'Caractère trouvé', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Mettre à jour un caractère
export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { symbol, type, media_url } = req.body;

    const character = await Character.findByIdAndUpdate(
      id,
      { symbol, type, media_url },
      { new: true, runValidators: true }
    );

    if (!character) {
      return APIResponse(res, null, 'Caractère non trouvé', 404);
    }

    return APIResponse(res, character, 'Caractère mis à jour', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Supprimer un caractère
export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);

    if (!character) {
      return APIResponse(res, null, 'Caractère non trouvé', 404);
    }

    return APIResponse(res, character, 'Caractère supprimé', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};
