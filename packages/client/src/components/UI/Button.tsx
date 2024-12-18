'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import clsx from 'clsx';

interface Props {
  size?: 'm' | 'l' | 'xl';
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  link?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  size = 'm',
  children,
  onClick,
  link,
  disabled = false,
  style,
  className,
  type = 'button',
}: Props) {
  const router = useRouter();

  const handleClick = (e?: React.MouseEvent<HTMLButtonElement>): void => {
    if (link) router.push(link);
    if (onClick) onClick(e);
  };

  return (
    <button
      className={clsx('button', size, className, { disabled })}
      onClick={handleClick}
      disabled={disabled}
      style={style}
      type={type}
    >
      {children}
    </button>
  );
}
