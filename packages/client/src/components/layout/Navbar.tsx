"use client";

import Link from "next/link";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Nav>
      <Link href="/" style={{ display: "flex", alignItems: "center", marginRight: "1rem"}}>
        <img src="/logo.svg" alt="Accueil" />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/">
          Accueil
        </Link>
        <Link href="/kanas">
          Kanas
        </Link>
        <Link href="/badges">
          Badges
        </Link>
      </div>
      <Link href="/login" style={{ marginLeft: "auto" }}>Connexion</Link>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 2000px;
  margin: 0 auto;
`;
