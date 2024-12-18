'use client';

import styled from 'styled-components';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer spaces-block">
      <img src="/footer/ellipse.svg" alt="Ellipse" className="ellipse" />
      <div>
        <span>KanaMaster</span>
        <p>Apprends à lire les kanas simplement et efficacement.</p>
      </div>

      <div>
        <span>Navigation</span>
        <Link href="/">Accueil</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/kanas">Kanas</Link>
      </div>

      <div></div>
    </footer>
  );
}
