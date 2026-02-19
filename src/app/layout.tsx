import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GainForest Lexicon Evolution",
  description:
    "An interactive walkthrough of GainForest's ATProto lexicon enrichment for biodiversity monitoring, data sovereignty, and conservation transparency.",
  openGraph: {
    title: "GainForest Lexicon Evolution",
    description:
      "Enriching ATProto schemas for biodiversity monitoring, data sovereignty, and conservation transparency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
