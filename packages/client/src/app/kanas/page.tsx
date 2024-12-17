'use client';

const KanasPage = () => {
  return (
    <main className="kanas-main">
      <h1 className="text-center">Les Alphabets Japonais</h1>
      <br />
      <br />
      <section className="card">
        <img src="/kanas/hiragana.png" alt="Hiragana" width={400} />
        <div>
          <h2 className="text-center">Hiragana</h2>
          <p>
            Le hiragana est l'un des deux syllabaires utilisés dans la langue
            japonaise. Il est principalement utilisé pour écrire les mots
            d'origine japonaise et les particules grammaticales. Chaque
            caractère représente une syllabe.
          </p>
        </div>
      </section>
      <br />
      <section className="card">
        <img src="/kanas/katakana.png" alt="Katakana" width={400} />
        <div>
          <h2 className="text-center">Katakana</h2>
          <p>
            Le katakana est le second syllabaire japonais. Il est souvent
            utilisé pour transcrire les mots d'origine étrangère, les noms
            scientifiques, et pour mettre en valeur certains mots. Comme le
            hiragana, chaque caractère représente une syllabe.
          </p>
        </div>
      </section>
    </main>
  );
};

export default KanasPage;
