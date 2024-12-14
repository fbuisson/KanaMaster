"use client";

import styled from "styled-components";

export default function AdminPage() {
  return (
    <main>
      <S.Container>
        <h1>Administration</h1>
        <div className="spaces-block">
          <h2>Tableau de bord</h2>
          <S.Grid>
            <S.Card>
              <h3>Utilisateurs</h3>
              <p>Gérer les utilisateurs</p>
            </S.Card>
            <S.Card>
              <h3>Leçons</h3>
              <p>Gérer les leçons</p>
            </S.Card>
            <S.Card>
              <h3>Quiz</h3>
              <p>Gérer les quiz</p>
            </S.Card>
            <S.Card>
              <h3>Statistiques</h3>
              <p>Voir les statistiques</p>
            </S.Card>
          </S.Grid>
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
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  `,
  Card: styled.div`
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      margin-bottom: 1rem;
    }
  `
};
