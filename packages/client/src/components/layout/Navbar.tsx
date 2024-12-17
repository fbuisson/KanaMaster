'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Button from '../UI/Button';
import { apiClient } from '../../utils/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { API_URL } from '@/utils/config';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, role, userId, media } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      if (response.status === 200) {
        localStorage.clear();
        setIsLoggedIn(false);
        setMenuOpen(false);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  return (
    <nav>
      <div className="flex align-center">
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}
        >
          <img src="/logo.svg" alt="Accueil" />
        </Link>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Accueil
        </Link>
        <Link href="/quiz" onClick={() => setMenuOpen(false)}>
          Quiz
        </Link>
        <Link href="/kanas" onClick={() => setMenuOpen(false)}>
          Kanas
        </Link>
      </div>
      <div className="flex align-center">
        <S.Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          <img
            style={{ width: '2rem', height: '2rem' }}
            src="/navbar/hamburger.svg"
            alt="Menu"
          />
        </S.Hamburger>
      </div>
      <S.NavLinks className="flex align-center">
        {isLoggedIn && role ? (
          <>
            <Link
              href={role === 'admin' ? '/admin/dashboard' : '/profile'}
              onClick={() => setMenuOpen(false)}
              className="flex justify-center align-center"
            >
              <img
                src={
                  media
                    ? `${API_URL}/uploads/users/${userId}/${media}`
                    : '/default-avatar.png'
                }
                alt="Profil"
                width={40}
                height={40}
                className="rounded profile-image"
              />
              {role === 'admin' ? 'Tableau de bord' : 'Mon profil'}
            </Link>
            <Button onClick={handleLogout}>Se déconnecter</Button>
          </>
        ) : (
          <>
            <Link href="/register" onClick={() => setMenuOpen(false)}>
              Inscription
            </Link>
            <Button link="/login" onClick={() => setMenuOpen(false)}>
              Connexion
            </Button>
          </>
        )}
      </S.NavLinks>
      <S.Menu open={menuOpen}>
        <Button onClick={() => setMenuOpen(false)} size="l">
          X
        </Button>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Accueil" />
        </Link>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Accueil
        </Link>
        <Link href="/quiz" onClick={() => setMenuOpen(false)}>
          Quiz
        </Link>
        <Link href="/kanas" onClick={() => setMenuOpen(false)}>
          Kanas
        </Link>
        {isLoggedIn && role && userId ? (
          <>
            <Link
              href={role === 'admin' ? '/admin/dashboard' : '/profile'}
              onClick={() => setMenuOpen(false)}
            >
              {role === 'admin' ? 'Tableau de bord' : 'Mon profil'}
            </Link>
            <Button onClick={handleLogout}>Se déconnecter</Button>
          </>
        ) : (
          <>
            <Link href="/register" onClick={() => setMenuOpen(false)}>
              Inscription
            </Link>
            <Button link="/login" onClick={() => setMenuOpen(false)}>
              Connexion
            </Button>
          </>
        )}
      </S.Menu>
    </nav>
  );
}

const S = {
  NavLinks: styled.div`
    display: flex;

    @media (max-width: 768px) {
      display: none;
    }
  `,

  Hamburger: styled.div`
    display: none;
    cursor: pointer;
    font-size: 2rem;

    @media (max-width: 768px) {
      display: block;
    }
  `,

  Menu: styled.div<{ open: boolean }>`
    display: ${({ open }) => (open ? 'flex' : 'none')};
    align-items: center;
    gap: 1rem;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    background-color: white;
    justify-content: center;
    z-index: 10000;
    padding: 2rem;
    transition: all 5s ease-in-out;

    > button:first-of-type {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }
  `,
};
