'use client';

import { Character, CharacterType } from '@/types/types';
import { API_URL } from '@/utils/config';

interface CharacterCardProps {
  progression: {
    character: Character;
    attempts: number;
    correct_attempts: number;
    character_type: CharacterType;
  };
}

export default function CharacterCard({ progression }: CharacterCardProps) {
  return (
    <div className="card">
      <img
        src={`${API_URL}/uploads/characters/${progression.character_type}/${progression.character._id}/${progression.character.media}`}
        width={100}
        height={100}
        style={{ display: 'block' }}
        className="mx-auto"
        alt={progression.character.symbol}
        title={progression.character.symbol}
      />
      <h3>{progression.character.symbol}</h3>
      <p>ID: {progression.character._id}</p>
      <p>Symbole: {progression.character.symbol}</p>
      <p>Type: {progression.character.type}</p>
      <p>Voyelle: {progression.character.vowel}</p>
      <p>Consonne: {progression.character.consonant}</p>
      <p>Prononciation: {progression.character.japanese_pronunciation}</p>
      <p>Traduction: {progression.character.translation}</p>
      <div className="flex spaces-block">
        <p>
          <strong>Tentatives :</strong> {progression.attempts} /{' '}
          {progression.correct_attempts}
        </p>
      </div>
    </div>
  );
}
