import type { Metadata } from "next";
import { EB_Garamond, Hanken_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prachi World Exhibition Organizing | Spatial Architecture & Bespoke Pavilions",
  description:
    "We conceive, fabricate, and install turnkey environments for discerning international brands across Dubai World Trade Centre, Abu Dhabi, and Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${ebGaramond.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#121212] text-[#EDEDEA] font-sans selection:bg-[#C5B8A5] selection:text-[#121212]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
