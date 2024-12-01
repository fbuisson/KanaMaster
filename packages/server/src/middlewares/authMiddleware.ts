import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Récupère le token depuis les en-têtes (Authorization) ou les cookies
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Non autorisé : token manquant' });
    return;
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    (req as any).user = decoded;

    next(); // Passe au middleware ou contrôleur suivant
  } catch (error) {
    res.status(401).json({ message: 'Token invalide, accès refusé' });
  }
};
