import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

interface RequestWithUser extends ExpressRequest {
  user?: IUser;
}

export const accessControlMiddleware = (req: RequestWithUser, res: Response, next: NextFunction): void => {
  const user = req.user;
  const { userId } = req.params;

  if (user && (user.role === 'admin' || user.id === userId)) {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit : vous ne pouvez accéder qu\'à vos propres données' });
  }
};
