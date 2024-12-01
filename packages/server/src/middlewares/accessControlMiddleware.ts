import { Request, Response, NextFunction } from 'express';

export const accessControlMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as { id: string; role: string };
  const { userId } = req.params;

  if (user.role === 'admin' || user.id === userId) {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit : vous ne pouvez accéder qu\'à vos propres données' });
  }
};
