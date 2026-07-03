import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinxxo.com"),
  title: {
    template: "%s | vinxxo",
    default: "vinxxo | Creative Technologist",
  },
  description:
    "Vinxxo is a creative technologist crafting high-performance web experiences with precision and minimalist aesthetics.",
  keywords: [
    "vinxxo",
    "creative technologist",
    "web developer",
    "UI/UX designer",
    "portfolio",
    "frontend developer",
  ],
  openGraph: {
    title: "vinxxo | Creative Technologist",
    description:
      "Crafting high-performance web experiences with precision and minimalist aesthetics.",
    url: "/",
    siteName: "vinxxo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vinxxo | Creative Technologist",
    description:
      "Crafting high-performance web experiences with precision and minimalist aesthetics.",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "vinxxo" }],
  creator: "vinxxo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  );
}
