'use client';

import Button from '@/components/UI/Button';

export default function Home() {
  return (
    <main>
      <div className="hero">
        <div className="flex flex-1 justify-center align-center flex-column"></div>
        <div className="flex flex-1 justify-center align-center flex-column">
          <h1 className="flex flex-column">
            カナマスター<span className="display-1">KanaMaster</span>
          </h1>
          <p className="display-text">Apprends à lire les kanas</p>
          <p className="display-text">かなを読むことを学ぶ</p>
          <Button size="xl" style={{ marginTop: '2rem' }} link="/register">
            Commencer
          </Button>
        </div>
      </div>
      <div className="spaces-block">
        <h2 className="text-center">Pourquoi KanaMaster ?</h2>
        <div className="flex spaces-block justify-center flex-wrap">
          <div className="flex flex-1 justify-center align-center flex-column home-benefit">
            <img
              src="/home/interactives_lessons.png"
              alt="Leçons interactives"
              style={{ marginBottom: '1rem' }}
            />
            <h3>Leçons interactives</h3>
            <p style={{ width: '380px' }}>
              Apprends les hiraganas et katakanas simplement grâce à des leçons
              interactives et engageantes.
            </p>
          </div>
          <div className="flex flex-1 justify-center align-center flex-column home-benefit">
            <img
              src="/home/quiz_and_games.png"
              alt="Quiz et jeux"
              style={{ marginBottom: '1rem' }}
            />
            <h3>Quiz et jeux</h3>
            <p style={{ width: '380px' }}>
              Teste tes connaissances avec des quiz et des jeux de kana.
            </p>
          </div>
          <div className="flex flex-1 justify-center align-center flex-column home-benefit">
            <img
              src="/home/progression.png"
              alt="Progression"
              style={{ marginBottom: '1rem' }}
            />
            <h3>Progression</h3>
            <p style={{ width: '380px' }}>
              Suis ton progresse avec un tableau de progression.
            </p>
          </div>
          <div className="flex flex-1 justify-center align-center flex-column home-benefit">
            <img
              src="/home/badges.png"
              alt="Badges"
              style={{ marginBottom: '1rem' }}
            />
            <h3>Badges</h3>
            <p style={{ width: '380px' }}>
              Gagne des badges en récompense de tes efforts.
            </p>
          </div>
        </div>
        <div className="spaces-block banner">
          <h2>Prêt à maîtriser les hiraganas et les katakanas ?</h2>
          <p>
            Rejoignez KanaMaster dès aujourd&#39;hui et commencez votre voyage
            d&#39;apprentissage !
          </p>
          <Button size="xl" link="/register">
            Commencer
          </Button>
        </div>
      </div>
    </main>
  );
}
