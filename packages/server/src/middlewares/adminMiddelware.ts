import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { APIResponse } from '../utils/response';
import User from '../models/User';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.accessToken;

  if (!token) {
    APIResponse(res, null, 'Non autorisé : token manquant', 401);
    return;
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;

    // Récupère l'utilisateur complet depuis la base de données
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      APIResponse(res, null, 'Utilisateur non trouvé', 404);
      return;
    } else if (user.role !== 'admin') {
        APIResponse(res, null, 'Accès interdit : rôle insuffisant', 403);
        return;
    } else next();
  } catch (error) {
    console.error('Erreur JWT:', error);
    APIResponse(res, null, 'Token invalide, accès refusé', 401);
  }
};
