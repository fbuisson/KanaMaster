'use client';

import { Noto_Sans_JP } from 'next/font/google';
import './globals.scss';
import Navbar from '@/components/layout/Navbar';
import ThemeWrapper from '@/components/layout/ThemeWrapper';
import { AuthProvider } from '@/contexts/AuthContext';
import Footer from '@/components/layout/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.variable}`}>
        <AuthProvider>
          <ThemeWrapper>
            <Navbar />
            {children}
            <Footer />
          </ThemeWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
