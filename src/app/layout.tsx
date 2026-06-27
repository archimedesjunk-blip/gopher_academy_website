import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gopheracademy.biz"),
  title: "Gopher Academy, Sonoma County Gopher Control",
  description:
    "Poison-free gopher control in Sonoma County. We trap pocket gophers with mechanical traps only, so it stays safe around your pets, kids, and garden. Request a free quote.",
  openGraph: {
    title: "Gopher Academy",
    description: "Poison-free gopher control in Sonoma County. We teach gophers a lesson.",
    images: ["/logo-wide.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
