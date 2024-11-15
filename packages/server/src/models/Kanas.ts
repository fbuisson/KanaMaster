// src/models/Kana.ts
import { Schema, model, Document } from 'mongoose';

export interface IKana extends Document {
  symbol: string;
  type: 'hiragana' | 'katakana';
  media_url?: string;
}

const KanaSchema = new Schema<IKana>({
  symbol: { type: String, required: true, maxlength: 10 },
  type: { type: String, required: true, enum: ['hiragana', 'katakana'], maxlength: 10 },
  media_url: { type: String, maxlength: 255 },
});

export default model<IKana>('Kana', KanaSchema);