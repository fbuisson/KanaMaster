import { Schema, model, Document } from 'mongoose';
import { CharacterType } from './Character';

export interface IBadge extends Document {
  title: string;
  description: string;
  media_url: string;
  requirements: {
    type: CharacterType | 'all';
    threshold: number;
  };
}

const BadgeSchema = new Schema<IBadge>({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 255 },
  media_url: { type: String, required: true, maxlength: 255 },
  requirements: {
    type: { type: String, required: true, enum: ['hiragana', 'katakana', 'kanji'] },
    threshold: { type: Number, required: true },
  },
});

export default model<IBadge>('Badge', BadgeSchema);