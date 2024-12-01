import { Schema, model, Document } from 'mongoose';

export interface IUserBadge extends Document {
  user_id: Schema.Types.ObjectId;
  badge_id: Schema.Types.ObjectId;
  date_awarded: Date;
}

const UserBadgeSchema = new Schema<IUserBadge>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  badge_id: { type: Schema.Types.ObjectId, ref: 'Badge', required: true },
  date_awarded: { type: Date, default: Date.now },
});

export default model<IUserBadge>('UserBadge', UserBadgeSchema);
