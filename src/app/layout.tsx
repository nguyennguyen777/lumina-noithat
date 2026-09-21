import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMINA Interior — Nội thất hiện đại cho không gian sống",
  description:
    "LUMINA Interior — Nội thất luxury hiện đại. Sofa, Bàn, Ghế, Giường, Tủ, Đèn, Decor cao cấp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans">
        <CartProvider>
          <FavoritesProvider>
            <SiteShell>{children}</SiteShell>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
