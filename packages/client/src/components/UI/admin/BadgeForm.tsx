'use client';

import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import { BadgeType } from '@/types/types';
import { apiClient } from '@/utils/apiClient';

const BadgeForm: React.FC = () => {
  const [badgeTitle, setBadgeTitle] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [badgeMediaFile, setBadgeMediaFile] = useState<File | null>(null);
  const [selectedBadgeType, setSelectedBadgeType] = useState<BadgeType>(
    BadgeType.ALL
  );
  const [badgeAttempts, setBadgeAttempts] = useState(0);
  const [badgeNumber, setBadgeNumber] = useState(0);
  const [badgePercentage, setBadgePercentage] = useState(0);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBadgeMediaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeMediaFile) {
      alert('Please select a media file.');
      return;
    }

    const formData = new FormData();
    formData.append('media', badgeMediaFile);
    formData.append('title', badgeTitle);
    formData.append('description', badgeDescription);
    formData.append('type', selectedBadgeType);
    formData.append('attempts', badgeAttempts.toString());
    formData.append('percentage', badgePercentage.toString());
    formData.append('number', badgeNumber.toString());

    try {
      await apiClient.post('/badge', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error adding badge:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="spaces-block text-center">
      <label htmlFor="title">Titre</label>
      <input
        id="title"
        type="text"
        placeholder="Titre"
        value={badgeTitle}
        onChange={(e) => setBadgeTitle(e.target.value)}
        required
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={badgeDescription}
        onChange={(e) => setBadgeDescription(e.target.value)}
        required
      />
      <label htmlFor="media">Image</label>
      <input
        id="media"
        type="file"
        accept="image/*"
        onChange={handleMediaChange}
        required
      />
      <label htmlFor="type">Type</label>
      <select
        id="type"
        value={selectedBadgeType}
        onChange={(e) => setSelectedBadgeType(e.target.value as BadgeType)}
        required
      >
        {Object.values(BadgeType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <label htmlFor="number">Nombre de caractères</label>
        <input
          id="number"
          type="number"
          placeholder="Nombre de caractères"
          value={badgeNumber}
          min={0}
          onChange={(e) => setBadgeNumber(Number(e.target.value))}
          required
          style={{ paddingRight: '20px' }}
        />
        <label htmlFor="attempts">Nombre d&#39;essais</label>
        <input
          id="attempts"
          type="number"
          placeholder="Nombre d'essais"
          value={badgeAttempts}
          min={0}
          onChange={(e) => setBadgeAttempts(Number(e.target.value))}
          required
          style={{ paddingRight: '20px' }}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          essais
        </span>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <label htmlFor="percentage">Pourcentage</label>
        <input
          id="percentage"
          type="number"
          placeholder="Pourcentage"
          value={badgePercentage}
          min={0}
          max={100}
          onChange={(e) => setBadgePercentage(Number(e.target.value))}
          required
          style={{ paddingRight: '20px' }}
        />
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          %
        </span>
      </div>
      <Button type="submit" className="mx-auto">
        Sauvegarder
      </Button>
    </form>
  );
};

export default BadgeForm;
