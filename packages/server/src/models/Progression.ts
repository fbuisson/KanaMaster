import { Schema, model, Document } from 'mongoose';
import { CharacterType } from './Character';

export interface IProgression extends Document {
  user_id: Schema.Types.ObjectId; // ID de l'utilisateur
  character_id: Schema.Types.ObjectId; // ID du caractère
  character_type: CharacterType; // Type de caractère
  attempts: number; // Tentatives totales
  correct_attempts: number; // Réponses correctes
  status: 'not mastered' | 'learning' | 'mastered'; // Statut de progression
}

const ProgressionSchema = new Schema<IProgression>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  character_id: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
  character_type: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  correct_attempts: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['not mastered', 'learning', 'mastered'],
    default: 'not mastered',
  },
});

export default model<IProgression>('Progression', ProgressionSchema);
