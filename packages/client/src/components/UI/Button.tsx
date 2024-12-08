"use client";

import React from "react";
import styled from "styled-components";

interface props {
  size?: "m" | "l" | "xl";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  size = "m",
  children,
  onClick,
  disabled = false,
  style,
  type = "button",
}: props) {
  return (
    <S.Button
      size={size}
      onClick={onClick}
      disabled={disabled}
      style={style}
      type={type}
    >
      {children}
    </S.Button>
  );
}

const S = {
  Button: styled.button<props>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: none;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.secondary};
    padding: ${({ size, theme }) => theme.sizes.button[size || "m"].padding};
    font-size: ${({ size, theme }) => theme.sizes.button[size || "m"].fontSize};
    box-shadow: 4px 3px 0px 0px #A42221;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:active {
      transform: translate(4px, 3px)!important;
      box-shadow: 0px 0px 0px 0px #A42221!important;
    }
    
    &:hover {
      transform: translate(2px, 1px);
      box-shadow: 2px 1px 0px 0px #A42221;
    }
  `,
};
