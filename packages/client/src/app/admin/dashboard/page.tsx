'use client';

import { apiClient } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import {
  User,
  Character,
  CharacterType,
  Vowel,
  Consonant,
} from '@/types/types';
import styled from 'styled-components';
import UserCard from '@/components/UI/admin/UserCard';
import CharacterCard from '@/components/UI/admin/CharacterCard';
import Button from '@/components/UI/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { role } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [refreshU, setRefreshU] = useState(0);
  const [refreshK, setRefreshK] = useState(0);
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [selectedCharacterType, setSelectedCharacterType] =
    useState<CharacterType>(CharacterType.HIRAGANA);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [symbol, setSymbol] = useState('');
  const [selectedVowel, setSelectedVowel] = useState<Vowel | null>(null);
  const [selectedConsonant, setSelectedConsonant] = useState<Consonant | null>(
    null
  );
  const [japanesePronunciation, setJapanesePronunciation] =
    useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  if (role !== 'admin') {
    router.push('/');
  }

  useEffect(() => {
    fetchUsers();
    fetchCharacters();
  }, [refreshU, refreshK]);

  const fetchUsers = async () => {
    const response = await apiClient.get('/user/list');
    setUsers(response.data.data);
  };

  const fetchCharacters = async () => {
    const response = await apiClient.get('/character');
    console.log('LES CHARACTERS : ', response.data.data);
    setCharacters(response.data.data);
  };

  const refreshUsers = () => {
    setRefreshU((prev) => prev + 1);
  };

  const refreshCharacters = () => {
    setRefreshK((prev) => prev + 1);
  };

  const toggleCharacterForm = () => {
    setShowCharacterForm((prev) => !prev);
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setMediaFile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!mediaFile) {
      alert('Please upload an image for the media.');
      return;
    }

    const formData = new FormData();
    formData.append('media', mediaFile);
    formData.append('symbol', symbol);
    formData.append('type', selectedCharacterType || '');
    formData.append('vowel', selectedVowel || '');
    formData.append('consonant', selectedConsonant || '');
    formData.append('japanese_pronunciation', japanesePronunciation || '');
    formData.append('translation', translation || '');

    try {
      const response = await apiClient.post('/character/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Character added:', response.data);
      refreshCharacters();
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  return (
    <main>
      <S.Container>
        <h1>Administration</h1>
        <div className="spaces-block">
          <div className="flex">
            <h2>Utilisateurs</h2>
            <Button onClick={refreshUsers}>Rafraîchir</Button>
          </div>
          <div className="flex spaces-block">
            {users.map((user) => (
              <UserCard key={`${user._id}-${refreshU}`} user={user} />
            ))}
          </div>
        </div>
        <div className="spaces-block">
          <div className="flex">
            <h2>Caractères</h2>
            <Button onClick={refreshCharacters}>Rafraîchir</Button>
            <Button onClick={toggleCharacterForm}>Ajouter un Caractère</Button>
          </div>
          {showCharacterForm && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
              <select
                value={selectedCharacterType}
                onChange={(e) =>
                  setSelectedCharacterType(e.target.value as CharacterType)
                }
                required
              >
                {Object.values(CharacterType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={selectedVowel || ''}
                onChange={(e) => setSelectedVowel(e.target.value as Vowel)}
                required
              >
                {Object.values(Vowel).map((vowel) => (
                  <option key={vowel} value={vowel}>
                    {vowel}
                  </option>
                ))}
              </select>
              <select
                value={selectedConsonant || ''}
                onChange={(e) =>
                  setSelectedConsonant(e.target.value as Consonant)
                }
                required
              >
                {Object.values(Consonant).map((consonant) => (
                  <option key={consonant} value={consonant}>
                    {consonant}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Prononciation Japonaise"
                value={japanesePronunciation}
                onChange={(e) => setJapanesePronunciation(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Traduction"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaChange}
                required
              />
              <Button type="submit">Sauvegarder</Button>
            </form>
          )}
          <div className="flex spaces-block">
            {characters.map((character) => (
              <CharacterCard
                key={`${character._id}-${refreshK}`}
                character={character}
                refresh={refreshCharacters}
              />
            ))}
          </div>
        </div>
      </S.Container>
    </main>
  );
}

const S = {
  Container: styled.div`
    padding: 2rem;
    margin-top: 80px;
  `,
};
