import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import { SOS } from "@/components/SOS";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "People",
  description: "Conectamos corações generosos a quem mais precisa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-[#EFF5F5]`}>
        <SOS/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
