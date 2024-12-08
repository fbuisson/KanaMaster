import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar";
import ThemeWrapper from "@/components/layout/ThemeWrapper";
import { AuthProvider } from "@/contexts/AuthContext";


const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KanaMaster",
  description: "Apprenez les kanas de manière ludique et interactive",
};

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
          </ThemeWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
