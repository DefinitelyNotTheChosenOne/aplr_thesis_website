import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IntelliGate | Edge-AI ALPR & Campus Security System",
  description:
    "IntelliGate: An Edge-AI License Plate Recognition and Vehicle Registration Portal for Automated Campus Security. Thesis capstone by BSCPE 4A at Dr. Yanga's Colleges Inc.",
  keywords: [
    "IntelliGate",
    "ALPR",
    "License Plate Recognition",
    "Edge-AI",
    "Dr. Yanga's Colleges Inc.",
    "BSCPE 4A",
    "Computer Engineering",
    "YOLOv11",
    "Campus Security",
    "Flutter App",
  ],
  authors: [
    { name: "Lawrence Matthew J. Rodeo" },
    { name: "Mark Rhaeniel Fabian" },
    { name: "Pamela Domingo" },
    { name: "Lorenz Neil Godoy" },
    { name: "Richmond Reynante" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
