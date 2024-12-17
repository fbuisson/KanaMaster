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

export enum Vowel {
  EMPTY = '',
  A = 'a',
  I = 'i',
  U = 'u',
  E = 'e',
  O = 'o',
}

export enum Consonant {
  EMPTY = '',
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
