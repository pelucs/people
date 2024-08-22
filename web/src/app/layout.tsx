import { Inter_Tight, Anek_Gujarati } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter"});
const anek = Anek_Gujarati({ subsets: ["latin"], weight: "700", variable: "--font-alt"});

export const metadata: Metadata = {
  title: "Socioambiental",
  description: "Conectamos corações generosos a quem mais precisa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${anek.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
