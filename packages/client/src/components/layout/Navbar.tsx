"use client";

import Link from "next/link";
import styled from "styled-components";
import Button from "../UI/Button";
import { apiClient } from "../../utils/apiClient";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      if(response.status === 200) {
        localStorage.clear();
        setIsLoggedIn(false);
      }
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
          <>
            <Link href="/profil"></Link>
            <Button onClick={handleLogout}>Se déconnecter</Button>
          </>
        ) : (
          <>
            <Link href="/inscription">
              Inscription
            </Link>
            <Button link="/connexion">Connexion</Button>
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
