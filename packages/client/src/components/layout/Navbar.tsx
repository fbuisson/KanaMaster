"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../UI/Button";

export default function Navbar() {
  return (
    <Nav>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", marginRight: "1rem"}}>
          <img src="/logo.svg" alt="Accueil" />
        </Link>
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
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/inscription">
          Inscription
        </Link>
        <Button>
          Connexion
        </Button>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 2000px;
  width: 100%;
  height: 80px;
  z-index: 9999;
`;
