// src/controllers/kanaController.ts
import { Request, Response } from 'express';
import Kana from '../models/Kana';
import { APIResponse } from '../utils/response';

// Créer un nouveau kana
export const createKana = async (req: Request, res: Response) => {
  try {
    const { symbol, type, media_url } = req.body;
    const newKana = new Kana({ symbol, type, media_url });
    await newKana.save();

    return APIResponse(res, newKana, 'Kana créé avec succès', 201);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Obtenir tous les kanas
export const getAllKanas = async (req: Request, res: Response) => {
  try {
    const kanas = await Kana.find();
    return APIResponse(res, kanas, 'Liste des kanas', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Obtenir un kana par ID
export const getKanaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kana = await Kana.findById(id);

    if (!kana) {
      return APIResponse(res, null, 'Kana non trouvé', 404);
    }

    return APIResponse(res, kana, 'Kana trouvé', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Mettre à jour un kana
export const updateKana = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { symbol, type, media_url } = req.body;

    const kana = await Kana.findByIdAndUpdate(
      id,
      { symbol, type, media_url },
      { new: true, runValidators: true }
    );

    if (!kana) {
      return APIResponse(res, null, 'Kana non trouvé', 404);
    }

    return APIResponse(res, kana, 'Kana mis à jour', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

// Supprimer un kana
export const deleteKana = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kana = await Kana.findByIdAndDelete(id);

    if (!kana) {
      return APIResponse(res, null, 'Kana non trouvé', 404);
    }

    return APIResponse(res, kana, 'Kana supprimé', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};
