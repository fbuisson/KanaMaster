'use client';

import { useState } from 'react';
import { Character, CharacterType, Vowel, Consonant } from '@/types/types';
import { apiClient } from '@/utils/apiClient';
import Button from '@/components/UI/Button';
import styled from 'styled-components';
import { API_URL } from '@/utils/config';

interface CharacterCardProps {
  character: Character;
  refresh: () => void;
}

export default function CharacterCard({
  character,
  refresh,
}: CharacterCardProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    document.getElementById('imageUpload')?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('symbol', editedCharacter.symbol);
    formData.append('type', editedCharacter.type);
    editedCharacter.vowel && formData.append('vowel', editedCharacter.vowel);
    editedCharacter.consonant &&
      formData.append('consonant', editedCharacter.consonant);
    formData.append(
      'japanese_pronunciation',
      editedCharacter.japanese_pronunciation
    );
    formData.append('translation', editedCharacter.translation);
    if (imageFile) {
      formData.append('media', imageFile);
    }

    try {
      await apiClient.put(`/character/${character._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Le caractère a été modifié avec succès');
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
      refresh();
    } catch (error) {
      setMessage('La modification du caractère a échoué');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDelete = async () => {
    await apiClient.delete(`/character/${character._id}`);
    refresh();
  };

  return (
    <div className="card">
      {!isEditing ? (
        <>
          <img
            src={`${API_URL}/uploads/characters/${character.type}/${character._id}/${character.media}`}
            width={100}
            height={100}
            style={{ display: 'block' }}
            className="mx-auto"
            alt={character.symbol}
            onClick={handleImageClick}
            title="Cliquez pour changer l'image"
          />
          <h3>{character.symbol}</h3>
          <p>ID: {character._id}</p>
          <p>Symbole: {character.symbol}</p>
          <p>Type: {character.type}</p>
          <p>Voyelle: {character.vowel}</p>
          <p>Consonne: {character.consonant}</p>
          <p>Prononciation: {character.japanese_pronunciation}</p>
          <p>Traduction: {character.translation}</p>
          <div className="flex spaces-block">
            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
            <Button onClick={handleDelete}>Supprimer</Button>
          </div>
        </>
      ) : (
        <>
          <input type="file" onChange={handleImageChange} />
          <label htmlFor="symbol">Symbole</label>
          <input
            id="symbol"
            name="symbol"
            value={editedCharacter.symbol}
            onChange={handleInputChange}
            placeholder="Symbole"
          />
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={editedCharacter.type}
            onChange={handleInputChange}
          >
            {Object.values(CharacterType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label htmlFor="vowel">Voyelle</label>
          <select
            id="vowel"
            name="vowel"
            value={editedCharacter.vowel}
            onChange={handleInputChange}
          >
            {Object.values(Vowel).map((vowel) => (
              <option key={vowel} value={vowel}>
                {vowel}
              </option>
            ))}
          </select>
          <label htmlFor="consonant">Consonne</label>
          <select
            id="consonant"
            name="consonant"
            value={editedCharacter.consonant}
            onChange={handleInputChange}
          >
            {Object.values(Consonant).map((consonant) => (
              <option key={consonant} value={consonant}>
                {consonant}
              </option>
            ))}
          </select>
          <label htmlFor="japanese_pronunciation">
            Prononciation japonaise
          </label>
          <input
            id="japanese_pronunciation"
            name="japanese_pronunciation"
            value={editedCharacter.japanese_pronunciation}
            onChange={handleInputChange}
            placeholder="Prononciation japonaise"
          />
          <label htmlFor="translation">Traduction</label>
          <input
            id="translation"
            name="translation"
            value={editedCharacter.translation}
            onChange={handleInputChange}
            placeholder="Traduction"
          />
          <div className="flex spaces-block">
            <Button onClick={handleUpdate}>Sauvegarder</Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                setEditedCharacter(character);
              }}
            >
              Annuler
            </Button>
          </div>
        </>
      )}
      {message && (
        <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>
      )}
    </div>
  );
}
