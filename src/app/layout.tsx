import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono, Caprasimo } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});
const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "midcurved — builder media studio + product lab",
  description:
    "Apps, podcast, YouTube, newsletter. One brand, shipped in public. A portfolio of ventures built on the Curve design system.",
  metadataBase: new URL("https://midcurved.com"),
  openGraph: {
    title: "midcurved",
    description:
      "Builder media studio and product lab. Apps, podcast, YouTube, newsletter. One brand, shipped in public.",
    url: "https://midcurved.com",
    siteName: "midcurved",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "midcurved",
    description: "Builder media studio and product lab.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-mode="middle"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable} ${caprasimo.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
