export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export enum CharacterType {
  HIRAGANA = 'hiragana',
  KATAKANA = 'katakana',
}

export enum BadgeType {
  HIRAGANA = 'hiragana',
  KATAKANA = 'katakana',
  KANA = 'kana',
  ALL = 'all',
}

export enum Vowel {
  EMPTY = 'Pas de voyelle',
  A = 'a',
  I = 'i',
  U = 'u',
  E = 'e',
  O = 'o',
}

export enum Consonant {
  EMPTY = 'Pas de consonne',
  K = 'k',
  G = 'g',
  S = 's',
  Z = 'z',
  T = 't',
  D = 'd',
  H = 'h',
  B = 'b',
  P = 'p',
  M = 'm',
  Y = 'y',
  R = 'r',
  W = 'w',
  N = 'n',
}

export interface Character {
  _id: string;
  symbol: string;
  type: CharacterType;
  vowel: Vowel;
  consonant: Consonant;
  japanese_pronunciation: string;
  translation: string;
  media: string;
}

export interface Badge {
  _id: string;
  title: string;
  description: string;
  media: string;
  requirements: {
    type: CharacterType | 'kana' | 'all';
    threshold: {
      attempts: number;
      percentage: number;
    };
  };
}

export interface UserBadge {
  _id: string;
  badge: Badge;
  date_awarded: Date;
}

export interface Progression {
  attempts: number;
  character: Character;
  character_type: CharacterType;
  correct_attempts: number;
  user_id: string;
  _id: string;
}
