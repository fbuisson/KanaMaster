import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
      res.status(401).json({ message: 'Non autorisé : utilisateur non connecté' });
      return;
    }

    const user = req.user as { id: string; role: string };

    if (user.role !== 'admin') {
      res.status(403).json({ message: 'Accès interdit : rôle insuffisant' });
      return;
    }

  next();
};
