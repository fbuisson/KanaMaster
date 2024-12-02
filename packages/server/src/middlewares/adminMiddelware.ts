import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

interface RequestWithUser extends ExpressRequest {
  user?: IUser;
}

export const adminMiddleware = (req: RequestWithUser, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
    return;
  }
  
  const user = req.user;

  if (user.role !== 'admin') {
    res.status(403).json({ message: 'Accès interdit : rôle insuffisant' });
    return;
  }

  next();
};
