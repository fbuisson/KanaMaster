'use client';

import { UserBadge } from '@/types/types';
import { API_URL } from '@/utils/config';

interface BadgeCardProps {
  userBadge: UserBadge;
}

export default function BadgeCard({ userBadge }: BadgeCardProps) {
  return (
    <div className="card text-center">
      <img
        src={`${API_URL}/uploads/badges/${userBadge.badge._id}/${userBadge.badge.media}`}
        width={100}
        height={100}
        style={{ display: 'block' }}
        className="mx-auto"
        alt={userBadge.badge.title}
      />
      <br />
      <h3>{userBadge.badge.title}</h3>
      <p>{userBadge.badge.description}</p>
      <p>
        Date d'obtention:{' '}
        {new Date(userBadge.date_awarded).toLocaleDateString()}
      </p>
    </div>
  );
}
