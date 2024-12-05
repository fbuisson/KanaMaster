"use client";

import Button from "@/components/UI/Button";
import { useEffect, useState } from "react";
import styled from "styled-components";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [apiResponse, setApiResponse] = useState<{data: number, message: string} | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/check`)
      .then((response) => response.json())
      .then((data) => setApiResponse(data))
      .catch((error) => console.error("Error fetching API:", error));
  }, []);

  useEffect(() => {
    console.log(apiResponse);
  }, [apiResponse]);

  return (
    <main>
      <S.Hero>
        <S.Column>
      </S.Column>
      <S.Column>
        <div>
          <p>カナマスター</p>
          <h1>KanaMaster</h1>
          <p>Apprends à lire les kanas</p>
          <Button size="xl" style={{ marginTop: "2rem" }}>Commencer</Button>
        </div>
        </S.Column>
      </S.Hero>
      <div className="spaces-block">
        <h2 style={{ textAlign: "center" }}>Pourquoi KanaMaster ?</h2>
        <S.Flexcontainer className="spaces-block">
          <S.Column>
            <img src="/home/interactives_lessons.png" alt="Leçons interactives" />
            <h3>Leçons interactives</h3>
            <p style={{ width: "380px" }}>Apprends les hiraganas et katakanas simplement grâce à des leçons interactives et engageantes.</p>
          </S.Column>
          <S.Column>
            <img src="/home/quiz_and_games.png" alt="Quiz et jeux" />
            <h3>Quiz et jeux</h3>
            <p style={{ width: "380px" }}>Teste tes connaissances avec des quiz et des jeux de kana.</p>
          </S.Column>
          <S.Column>
            <img src="/home/progression.png" alt="Progression" />
            <h3>Progression</h3>
            <p style={{ width: "380px" }}>Suis ton progresse avec un tableau de progression.</p>
          </S.Column>
          <S.Column>
            <img src="/home/badges.png" alt="Badges" />
            <h3>Badges</h3>
            <p style={{ width: "380px" }}>Gagne des badges en récompense de tes efforts.</p>
          </S.Column>
        </S.Flexcontainer>
      </div>
    </main>
  );
}

const S = {
  Hero: styled.div`
    position: relative;
    top: 0;
    left: 50%;
    min-height: 100vh;
    width: 100%;
    max-width: 2000px;
    background: linear-gradient(180deg, rgba(255, 169, 102, 0.01) 58.06%, #FFEED0 99.87%), url("/hero.png") lightgray -1px -56.979px / 101.886% 129.592% no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transform: translateX(-50%);
  `,
  Column: styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      margin-bottom: 1rem;
    }
  `,
  Flexcontainer: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    div {
      margin-top: 2rem;
    }
  `
};
