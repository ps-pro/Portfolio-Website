import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { CosmicFooter } from "@/components/main/cosmic-footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { CosmicPlayModal } from "@/components/main/cosmic-play-modal"; // Add this import
import { CosmicProvider } from "@/contexts/cosmic-context"; // Add this import
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Noto+Sans+Kannada:wght@400;500;600;700;800;900&family=Noto+Sans+Telugu:wght@400;500;600;700;800;900&family=Noto+Sans+Tamil:wght@400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@400;500;600;700;800;900&family=Noto+Sans+Gujarati:wght@400;500;600;700;800;900&family=Noto+Sans+Arabic:wght@400;500;600;700;800;900&family=Noto+Sans+CJK+JP:wght@400;500;600;700;800;900&family=Noto+Sans+CJK+KR:wght@400;500;600;700;800;900&family=Noto+Sans+CJK+SC:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <CosmicProvider> {/* Add this wrapper */}
          <StarsCanvas />
          <Navbar />
          {children}
          <CosmicFooter />
          <CosmicPlayModal /> {/* Add this component */}
        </CosmicProvider> {/* Close the wrapper */}
      </body>
    </html>
  );
}