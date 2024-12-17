'use client';

import { useState } from 'react';
import Button from '@/components/UI/Button';
import styled from 'styled-components';
import { apiClient } from '@/utils/apiClient';

export default function Register() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
      hasErrors = true;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Format d'email invalide";
      hasErrors = true;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule et un chiffre';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        const response = await apiClient.post('/auth/register', formData);
        if (response.status === 201) {
          setSuccessMessage('Inscription réussie !');
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
      }
    }
  };

  return (
    <main>
      <S.Container>
        <S.FormWrapper>
          <h1>Inscription</h1>
          {successMessage ? (
            <p style={{ textAlign: 'center' }}>{successMessage}</p>
          ) : (
            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <S.ErrorMessage>{errors.username}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <S.ErrorMessage>{errors.email}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <S.ErrorMessage>{errors.password}</S.ErrorMessage>
                )}
              </S.FormGroup>

              <Button type="submit" size="l">
                S'inscrire
              </Button>
            </S.Form>
          )}
        </S.FormWrapper>
      </S.Container>
    </main>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
  `,
  FormWrapper: styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
  FormGroup: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  ErrorMessage: styled.span`
    color: red;
    font-size: 0.875rem;
  `,
};
