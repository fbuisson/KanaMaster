import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { APIResponse } from '../utils/response'; // Import de la fonction utilitaire

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return APIResponse(res, 400, 'User already exists');
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Enregistre le mot de passe hashé
    });

    await newUser.save();
    return APIResponse(res, null, 'User registered successfully', 201);
  } catch (error) {
    return APIResponse(res, null, 'Server error', 500);
  }
};
const NODE_ENV = process.env.NODE_ENV || 'development';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return APIResponse(res, null, 'Email ou mot de passe invalide', 400);
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return APIResponse(res, null, 'Email ou mot de passe invalide', 400);
    }

    // Génère les tokens JWT
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '15m', // Durée de vie du token d'accès
    });

    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET || 'refreshSecret', {
      expiresIn: '7d', // Durée de vie du token de rafraîchissement
    });

    // Définit les cookies pour les tokens
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes en millisecondes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en millisecondes
    });

    // Réponse de succès
    return APIResponse(res, {userId: user._id}, 'Vous êtes connecté', 200);
  } catch (err) {
    console.error(err);
    return APIResponse(res, null, 'Erreur serveur', 500);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Supprime les cookies en définissant une date d'expiration passée
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    });

    // Réponse de succès
    return APIResponse(res, null, 'Vous êtes déconnecté', 200);
  } catch (error) {
    console.error(error);
    return APIResponse(res, null, 'Erreur lors de la déconnexion', 500);
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return APIResponse(res, null, 'Refresh token manquant', 401);
    }

    // Vérifie et décode le refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refreshSecret') as jwt.JwtPayload;

    // Vérifie si l'utilisateur existe
    const user = await User.findById(decoded.id);
    if (!user) {
      return APIResponse(res, null, 'Utilisateur non trouvé', 404);
    }

    // Génère un nouveau token d'accès
    const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '15m',
    });

    // Définit le cookie pour le nouveau token d'accès
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes en millisecondes
    });

    return APIResponse(res, { accessToken: newAccessToken }, 'Nouveau token d\'accès généré', 200);
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token:', error);
    return APIResponse(res, null, 'Token invalide ou expiré', 401);
  }
};


