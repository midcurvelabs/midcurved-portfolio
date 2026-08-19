import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./ledger.css";
import { Providers } from "./providers";
import {
  PERSON_DESCRIPTION,
  PERSON_NAME,
  SITE_ORIGIN,
  SITE_URL,
  jsonLd,
} from "@/lib/person";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PERSON_NAME} — midcurved`,
  description: PERSON_DESCRIPTION,
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: SITE_URL,
  },
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  openGraph: {
    title: `${PERSON_NAME} — midcurved`,
    description: "I build products. The dead ones stay on the board.",
    url: SITE_URL,
    siteName: "midcurved",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${PERSON_NAME} — midcurved`,
    description: "I build products. The dead ones stay on the board.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#F3F2ED",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
