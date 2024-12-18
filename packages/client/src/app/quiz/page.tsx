'use client';

import Button from '@/components/UI/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Character } from '@/types/types';
import { apiClient } from '@/utils/apiClient';
import { API_URL } from '@/utils/config';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const QuizPage = () => {
  const router = useRouter();
  const { userId, isLoggedIn } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );
  const [timer, setTimer] = useState(30);
  const [userAnswer, setUserAnswer] = useState('');
  const [responses, setResponses] = useState<
    { character: Character; isCorrect: boolean }[]
  >([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchBadges = async () => {
      const response = await apiClient.post(`/user/badges/${userId}`);
      setCount(response.data.count);
    };
    if (userId) fetchBadges();
  }, [userId]);

  useEffect(() => {
    const saveProgression = async () => {
      if (quizFinished && responses.length > 0) {
        await apiClient.put(`/progression/${userId}`, {
          characters: responses,
        });
      }
    };

    saveProgression();
  }, [quizFinished]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  const fetchCharacters = async () => {
    try {
      const response = await apiClient.get('/character');
      const data = await response.data.data;
      setCharacters(data);
      setCurrentCharacter(data[Math.floor(Math.random() * data.length)]);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    fetchCharacters();
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setQuizStarted(false);
          setQuizFinished(true);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizFinished(false);
    setQuizStarted(false);
    setResponses([]);
    setUserAnswer('');
    setCurrentCharacter(null);
  };

  const handleAnswerSubmit = () => {
    if (!currentCharacter) return;
    const isCorrect =
      userAnswer.toUpperCase() === currentCharacter.translation.toUpperCase();
    setResponses([...responses, { character: currentCharacter, isCorrect }]);
    setUserAnswer('');
    setCurrentCharacter(
      characters[Math.floor(Math.random() * characters.length)]
    );
  };

  const calculateScore = () => {
    const correctAnswers = responses.filter(
      (response) => response.isCorrect
    ).length;
    return isNaN((correctAnswers / responses.length) * 100)
      ? 0
      : (correctAnswers / responses.length) * 100;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit();
    }
  };

  return (
    <main className="quiz-main">
      {quizFinished ? (
        <div className="flex-column card">
          <h1>Quiz</h1>
          <p className="spaces-block">
            <strong>Bravo ! Tu as terminé le quiz.</strong>
            <br />
            <br />
            Tu as remporté <strong>{count ?? 0} nouveau(x) badge(s)</strong>.
            <br />
            <br />
            Ton taux de bonnes réponses est de{' '}
            <strong>{Math.round(calculateScore() ?? 0)}%</strong>.
            <br />
            <br />
            Ta progression a été enregistrée.
            <br />
            Tu pourras la retrouver sur ta page profil.
          </p>
          <Button size="xl" onClick={resetQuiz} className="spaces-block">
            Recommencer
          </Button>
        </div>
      ) : !quizStarted ? (
        <div className="flex-column card">
          <h1>Quiz</h1>
          <p className="spaces-block">
            Tu as 30 secondes pour répondre à un maximum de questions.
            <br />
            <br />
            Un charactere est affiché, tu dois répondre par sa traduction
            romaji.
            <br />
            <br />A la fin du quiz, ta progression sera enregistrée pour chaque
            charactere répondu.
          </p>
          <Button size="xl" onClick={startQuiz} className="spaces-block">
            Démarrer
          </Button>
        </div>
      ) : (
        <div className="flex-column card">
          <progress id="file" max="30" value={timer}></progress>
          {currentCharacter && (
            <div className="flex flex-column">
              <img
                src={`${API_URL}/uploads/characters/${currentCharacter.type}/${currentCharacter._id}/${currentCharacter.media}`}
                alt="Character"
              />

              <div className="flex mx-auto justify-center">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Réponse"
                />

                <Button size="xl" onClick={handleAnswerSubmit}>
                  Envoyer
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default QuizPage;
