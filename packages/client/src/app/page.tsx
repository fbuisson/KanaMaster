"use client";

import Button from "@/components/UI/Button";
import { useAuth } from "@/contexts/AuthContext";
import styled from "styled-components";

export default function Home() {

  return (
    <main>
      <S.Hero>
        <S.Column>
        </S.Column>
        <S.Column>
            <h1 style={{ display: "flex", flexDirection: "column" }}>カナマスター<span className="display-1">KanaMaster</span></h1>
            <p className="display-text">Apprends à lire les kanas</p>
            <p className="display-text">かなを読むことを学ぶ</p>
            <Button size="xl" style={{ marginTop: "2rem" }} link="/register">Commencer</Button>
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
        <div className="spaces-block banner">
          <h2>Prêt à maîtriser les hiraganas et les katakanas ?</h2>
          <p>Rejoignez KanaMaster dès aujourd'hui et commencez votre voyage d'apprentissage !</p>
          <Button size="xl" link="/register">Commencer</Button>
        </div>
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
    background: linear-gradient(180deg, rgba(255, 169, 102, 0.01) 58.06%, #FFEED0 99.87%), url("/home/hero.png") lightgray -1px -56.979px / 101.886% 129.592% no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      background:  linear-gradient(180deg, rgba(255, 169, 102, 0.01) 58.06%, #FFEED0 99.87%), url("/home/hero_mobile.png") lightgray -1px -56.979px / 101.886% 129.592% no-repeat;

      > div:first-of-type {
        display: none;
      }
    }
  `,
  Column: styled.div`
    // flex: 1;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;

    // img {
    //   margin-bottom: 1rem;
    // }
  `,
  Flexcontainer: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    div {
      margin-top: 2rem;
    }

    @media (max-width: 768px) {
      p {
        text-align: center;
      }
    }
  `
};
