import { Schema, model, Document } from 'mongoose';
import { CharacterType } from './Character';

export interface IBadge extends Document {
  title: string;
  description: string;
  media: string;
  requirements: {
    type: CharacterType | 'kana' | 'all';
    threshold: {
      number: number;
      attempts: number;
      percentage: number;
    };
  };
}

const BadgeSchema = new Schema<IBadge>({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 255 },
  media: { type: String, required: true, maxlength: 255 },
  requirements: {
    type: {
      type: String,
      required: true,
      enum: ['hiragana', 'katakana', 'kanji', 'kana', 'all'],
    },
    threshold: {
      number: { type: Number, required: true },
      attempts: { type: Number, required: true },
      percentage: { type: Number, required: true },
    },
  },
});

export default model<IBadge>('Badge', BadgeSchema);
