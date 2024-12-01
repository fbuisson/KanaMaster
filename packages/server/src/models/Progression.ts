import { Schema, model, Document } from 'mongoose';

export interface IProgression extends Document {
  user_id: Schema.Types.ObjectId; // ID de l'utilisateur
  kana_id: Schema.Types.ObjectId; // ID du kana
  attempts: number; // Tentatives totales
  correct_attempts: number; // Réponses correctes
  status: 'not mastered' | 'learning' | 'mastered'; // Statut de progression
}

const ProgressionSchema = new Schema<IProgression>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  kana_id: { type: Schema.Types.ObjectId, ref: 'Kana', required: true },
  attempts: { type: Number, default: 0 },
  correct_attempts: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['not mastered', 'learning', 'mastered'],
    default: 'not mastered',
  },
});

export default model<IProgression>('Progression', ProgressionSchema);
