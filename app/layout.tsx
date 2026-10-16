import type { Metadata, Viewport } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Chakra_Petch({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
export const metadata: Metadata = {
  title: { default: "Wave Scrims | Fortnite Scrims for OCE & NA", template: "%s | Wave Scrims" },
  description: "Daily community Fortnite scrims for OCE and NA. Solos, Duos and Trios, ranked leaderboards, seasons and clip of the week.",
  openGraph: { title: "Wave Scrims", description: "Daily Fortnite scrims, leaderboards and seasons for OCE & NA.", type: "website" },
  twitter: { card: "summary", title: "Wave Scrims" },
};
export const viewport: Viewport = { themeColor: "#04101a" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased"><Nav /><main>{children}</main><Footer /></body>
    </html>
  );
}
