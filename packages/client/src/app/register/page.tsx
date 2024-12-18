'use client';

import { useState } from 'react';
import Button from '@/components/UI/Button';
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
      <div
        className="flex justify-center align-center"
        style={{ minHeight: '100vh', padding: '2rem' }}
      >
        <div className="formWrapper">
          <h1 className="text-center">Inscription</h1>
          {successMessage ? (
            <p className="text-center">{successMessage}</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-column"
              style={{ gap: '1.5rem' }}
            >
              <div className="flex flex-column" style={{ gap: '0.5rem' }}>
                <label htmlFor="username">Nom d&#39;utilisateur</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="message-error">{errors.username}</p>
                )}
              </div>

              <div className="flex flex-column" style={{ gap: '0.5rem' }}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="message-error">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-column" style={{ gap: '0.5rem' }}>
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="message-error">{errors.password}</p>
                )}
              </div>

              <Button type="submit" size="l">
                S&#39;inscrire
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
