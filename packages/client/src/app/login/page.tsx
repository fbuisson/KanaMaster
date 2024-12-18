'use client';

import { useState } from 'react';
import Button from '@/components/UI/Button';
import { apiClient } from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const { setIsLoggedIn, fetchUser } = useAuth();

  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
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
        const response = await apiClient.post('/auth/login', formData);
        if (response.status === 200 && response.data) {
          setIsLoggedIn(true);
          setSuccessMessage('Connexion réussie !');
          fetchUser();
          router.push('/');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
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
          <h1>Connexion</h1>
          {successMessage ? (
            <p style={{ textAlign: 'center' }}>{successMessage}</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-column"
              style={{ gap: '1.5rem' }}
            >
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
                Se connecter
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
