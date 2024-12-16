// src/models/Kana.ts
import { Schema, model, Document } from 'mongoose';

export type CharacterType = 'hiragana' | 'katakana' | 'kanji';

export interface ICharacter extends Document {
  symbol: string;
  type: CharacterType;
  vowel?: 'a' | 'i' | 'u' | 'e' | 'o' | null;
  consonant?:
    | 'k'
    | 'g'
    | 's'
    | 'z'
    | 't'
    | 'd'
    | 'n'
    | 'h'
    | 'b'
    | 'p'
    | 'm'
    | 'y'
    | 'r'
    | 'w'
    | 'n'
    | null;
  japanese_pronunciation?: string | null;
  translation?: string | null;
  media?: string;
}

const CharacterSchema = new Schema<ICharacter>({
  symbol: { type: String, required: true, maxlength: 10 },
  type: { type: String, required: true, enum: ['hiragana', 'katakana'] },
  vowel: {
    type: String,
    enum: ['a', 'i', 'u', 'e', 'o'],
    maxlength: 1,
  },
  consonant: {
    type: String,
    enum: [
      'k',
      'g',
      's',
      'z',
      't',
      'd',
      'n',
      'h',
      'b',
      'p',
      'm',
      'y',
      'r',
      'w',
      'n',
    ],
    maxlength: 1,
  },
  japanese_pronunciation: { type: String, maxlength: 255 },
  translation: { type: String, maxlength: 255 },
  media: { type: String, maxlength: 255 },
});

CharacterSchema.pre('save', function (this: ICharacter, next: Function) {
  if (
    this.vowel === null &&
    this.consonant === null &&
    this.translation === null &&
    this.japanese_pronunciation === null
  ) {
    return next(
      new Error(
        'Vowel, consonant, translation and japanese pronunciation cannot all be null at the same time.'
      )
    );
  }
  next();
});

export default model<ICharacter>('Character', CharacterSchema);
