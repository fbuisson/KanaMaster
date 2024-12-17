'use client';

import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { apiClient } from '@/utils/apiClient';
import { API_URL } from '@/utils/config';
import Button from '@/components/UI/Button';
import ProgresssionCard from '@/components/UI/profile/ProgresssionCard';
import { UserBadge } from '@/types/types';
import BadgeCard from '@/components/UI/BadgeCard';

const ProfilePage: React.FC = () => {
  const { userId, fetchUser } = useAuth();
  const [media, setMedia] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [progression, setProgression] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUser = await apiClient.get(`/user/${userId}`);
        if (responseUser.status === 200) {
          const data = responseUser.data.data;
          setMedia(data.media);
          setUsername(data.username);
          setEmail(data.email);
        }

        const responseProgression = await apiClient.get(
          `/progression/${userId}`
        );
        if (responseProgression.status === 200) {
          setProgression(responseProgression.data.data);
        }

        const responseBadges = await apiClient.get(`/user/badges/${userId}`);
        if (responseBadges.status === 200) {
          setUserBadges(responseBadges.data.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('media', imageFile);

      try {
        const response = await apiClient.post(
          `/user/profile/upload/${userId}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        if (response.status === 200) {
          setMedia(response.data.data.media);
          setMessage(response.data.message);
          setTimeout(() => setMessage(null), 3000);
          fetchUser();
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    }
  };

  return (
    <main className="profile-page">
      <div className="card justify-center align-center mx-auto">
        <img
          src={
            media
              ? `${API_URL}/uploads/users/${userId}/${media}`
              : '/default-profile.png'
          }
          alt="Profile"
          width={100}
          height={100}
          className="profile-image rounded"
        />
        <h2>{username}</h2>
        <p>{email}</p>
        <div className="flex spaces-block">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <Button onClick={handleImageUpload}>Enregistrer</Button>
        </div>
        {message && (
          <p className="message-success" style={{ marginTop: '8px' }}>
            {message}
          </p>
        )}
      </div>
      {progression.length > 0 && (
        <div className="spaces-block">
          <h2>Progression</h2>
          <br />
          <div className="flex spaces-block mx-auto">
            {progression.map((progress) => (
              <ProgresssionCard key={progress._id} progression={progress} />
            ))}
          </div>
        </div>
      )}
      <div className="spaces-block">
        <h2>Badges</h2>
        <div className="flex spaces-block mx-auto">
          {userBadges.map((userBadge) => (
            <BadgeCard key={userBadge._id} userBadge={userBadge} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
