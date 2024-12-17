import mongoose, { Schema, Document } from 'mongoose';

interface IUserBadge extends Document {
  user_id: mongoose.Types.ObjectId;
  badge_id: mongoose.Types.ObjectId;
  date_awarded: Date;
}

const UserBadgeSchema: Schema = new Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  badge_id: { type: mongoose.Types.ObjectId, ref: 'Badge', required: true },
  date_awarded: { type: Date, default: Date.now },
});

UserBadgeSchema.index({ user_id: 1, badge_id: 1 }, { unique: true });

export default mongoose.model<IUserBadge>('UserBadge', UserBadgeSchema);
