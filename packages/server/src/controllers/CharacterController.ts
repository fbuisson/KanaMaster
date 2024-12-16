// src/controllers/CharacterController.ts
import { Request, Response } from 'express';
import Character, { CharacterType, ICharacter } from '../models/Character';
import { APIResponse } from '../utils/response';
import path from 'path';
import fs from 'fs';

// Créer un nouveau caractère
export const createCharacter = async (req: Request, res: Response) => {
  try {
    const {
      symbol,
      type,
      vowel,
      consonant,
      japanese_pronunciation,
      translation,
    } = req.body;
    const file = req.file;

    if (!file) {
      return APIResponse(res, null, 'Image non téléchargée', 400);
    }

    // Create a new character without the media field first
    const newCharacter: ICharacter = new Character({
      symbol,
      type,
      vowel,
      consonant,
      japanese_pronunciation,
      translation,
      media: file.filename,
    });
    await newCharacter.save();

    // Define the directory path based on type and character ID
    const dirPath = path.join(
      __dirname,
      '../../uploads/characters',
      type as CharacterType,
      newCharacter.id.toString()
    );

    // Ensure the directory exists
    fs.mkdirSync(dirPath, { recursive: true });

    // Move the file to the correct directory
    const filePath = path.join(dirPath, file.filename);
    fs.renameSync(file.path, filePath);

    // Update the character with the media file name
    newCharacter.media = file.filename;
    await newCharacter.save();

    return APIResponse(res, null, 'Caractère créé avec succès', 201);
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
    const {
      symbol,
      type,
      vowel,
      consonant,
      japanese_pronunciation,
      translation,
    } = req.body;
    const file = req.file;

    const character = await Character.findById(id);
    if (!character) {
      return APIResponse(res, null, 'Caractère non trouvé', 404);
    }

    // Update character fields
    character.symbol = symbol;
    character.type = type;
    character.vowel = vowel;
    character.consonant = consonant;
    character.japanese_pronunciation = japanese_pronunciation;
    character.translation = translation;

    if (file) {
      // Define the directory path based on type and character ID
      const dirPath = path.join(
        __dirname,
        '../../uploads/characters',
        character.type as CharacterType,
        character.id.toString()
      );

      // Ensure the directory exists
      fs.mkdirSync(dirPath, { recursive: true });

      // Empty the directory
      fs.readdirSync(dirPath).forEach((file) => {
        const filePath = path.join(dirPath, file);
        fs.unlinkSync(filePath);
      });

      // Move the new file to the correct directory
      const filePath = path.join(dirPath, file.filename);
      fs.renameSync(file.path, filePath);

      // Update the character with the new media file name
      character.media = file.filename;
    }

    await character.save();

    return APIResponse(res, character, 'Caractère modifié avec succès', 200);
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
