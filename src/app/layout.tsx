import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./ledger.css";
import { Providers } from "./providers";

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
  title: "Rik Eerdekens — midcurved",
  description:
    "I build products. The dead ones stay on the board. Builder, operator, and creator. GodModePod, BeClaire, RikGPT, vibecode.fun.",
  metadataBase: new URL("https://midcurved.com"),
  openGraph: {
    title: "Rik Eerdekens — midcurved",
    description:
      "I build products. The dead ones stay on the board.",
    url: "https://midcurved.com",
    siteName: "midcurved",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rik Eerdekens — midcurved",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
