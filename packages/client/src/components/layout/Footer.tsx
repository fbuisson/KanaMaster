'use client';

import styled from 'styled-components';
import Link from 'next/link';

export default function Footer() {
  return (
    <S.Footer className="spaces-block">
      <img src="/footer/ellipse.svg" alt="Ellipse" className="ellipse" />
      <S.Column>
        <span>KanaMaster</span>
        <p>Apprends à lire les kanas simplement et efficacement.</p>
      </S.Column>

      <S.Column>
        <span>Navigation</span>
        <Link href="/">Accueil</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/kanas">Kanas</Link>
      </S.Column>

      <S.Column></S.Column>
    </S.Footer>
  );
}

const S = {
  Footer: styled.footer`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};

    > img {
      position: absolute;
      width: 100%;
      height: auto;
      top: 0;
      left: 0;
      transform: translateY(-50%);
    }

    span {
      font-size: 1rem;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
      text-align: center;
    }
  `,
  Column: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;

    h3 {
      margin-bottom: 0.5rem;
    }

    a {
      color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        color: ${({ theme }) => theme.colors.button.background};
      }
    }

    @media (max-width: 768px) {
      margin: 0 auto;
    }
  `,
};
