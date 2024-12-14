import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { APIResponse } from '../utils/response';
import User from '../models/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.accessToken;

  if (!token) {
    APIResponse(res, null, 'Non autorisé : token manquant', 401);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;

    const user = await User.findById(decoded.id).select('-password');
    (req as any).user = user;
    if (!user) {
      APIResponse(res, null, 'Utilisateur non trouvé', 404);
      return;
    } else next();
  } catch (error) {
    console.error('Erreur JWT:', error);
    APIResponse(res, null, 'Token invalide, accès refusé', 401);
  }
};
