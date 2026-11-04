import type { Metadata } from "next";
import { Anton, Manrope, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SHEVA RAMDHAN | Web, Backend & Enterprise Systems",
  description:
    "Sheva Ramdhan. Mahasiswa Sistem Informasi Universitas Andalas yang berfokus pada pengembangan aplikasi web, rekayasa backend, dan arsitektur sistem enterprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${anton.variable} ${manrope.variable} ${caveat.variable} ${jetbrainsMono.variable} dark scroll-smooth antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
