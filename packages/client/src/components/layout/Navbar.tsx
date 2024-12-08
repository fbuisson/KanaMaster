"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../UI/Button";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      localStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

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
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Link href="/inscription">
              Inscription
            </Link>
            <Button>
              <Link href="/connexion">Connexion</Link>
            </Button>
          </>
        )}
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
