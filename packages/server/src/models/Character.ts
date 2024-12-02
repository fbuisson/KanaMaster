// src/models/Kana.ts
import { Schema, model, Document } from 'mongoose';

export type CharacterType = 'hiragana' | 'katakana' | 'kanji';

export interface ICharacter extends Document {
  symbol: string;
  type: CharacterType;
  vowel: 'a' | 'i' | 'u' | 'e' | 'o';
  consonant: '-' | 'k' | 'g' | 's' | 'z' | 't' | 'd' | 'n' | 'h' | 'b' | 'p' | 'm' | 'y' | 'r' | 'w';
  media_url?: string;
}

const CharacterSchema = new Schema<ICharacter>({
  symbol: { type: String, required: true, maxlength: 10 },
  type: { type: String, required: true, enum: ['hiragana', 'katakana'] },
  vowel: { type: String, required: true, enum: ['a', 'i', 'u', 'e', 'o'], maxlength: 1 },
  consonant: { type: String, required: true, enum: ['-', 'k', 'g', 's', 'z', 't', 'd', 'n', 'h', 'b', 'p', 'm', 'y', 'r', 'w'], maxlength: 1 },
  media_url: { type: String, maxlength: 255 },
});

export default model<ICharacter>('Character', CharacterSchema);
