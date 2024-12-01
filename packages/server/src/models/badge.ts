import { Schema, model, Document } from 'mongoose';

export interface IBadge extends Document {
  title: string;
  description: string;
  media_url: string;
  requirements: {
    type: string;
    threshold: number;
  };
}

const BadgeSchema = new Schema<IBadge>({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 255 },
  media_url: { type: String, required: true, maxlength: 255 },
  requirements: {
    type: { type: String, required: true },
    threshold: { type: Number, required: true },
  },
});

export default model<IBadge>('Badge', BadgeSchema);