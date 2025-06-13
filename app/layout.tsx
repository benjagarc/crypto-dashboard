import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ModalProvider } from "@/components/context/ModalContext/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Dashboard | Track Cryptocurrency Prices",
  description:
    "Monitor real-time prices, trends, and market changes of popular cryptocurrencies.",
  keywords: [
    "cryptocurrency",
    "dashboard",
    "bitcoin",
    "ethereum",
    "crypto prices",
    "market trends",
  ],
  authors: [{ name: "Benjamín Jair García Romero" }],
  creator: "Benjamín Jair",
  icons: {
    icon: "/favicon.png", // También puedes usar .png o .svg si prefieres
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ModalProvider>
          <Providers>{children}</Providers>
        </ModalProvider>
      </body>
    </html>
  );
}
