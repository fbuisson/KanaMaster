import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../utils/response';
import jwt from 'jsonwebtoken';
import User from '../models/User';
export const accessControlMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];
  const { userId } = req.params;

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
    } else if (user && (user.role === 'admin' || user.id.toString() === userId)) {
        next();
    } else APIResponse(res, null, 'Accès interdit : vous ne pouvez accéder qu\'à vos propres données', 403);;
  } catch (error) {
    console.error('Erreur JWT:', error);
    APIResponse(res, null, 'Token invalide, accès refusé', 401);
  }
};
