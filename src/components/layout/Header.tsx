"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Sản phẩm" },
  { href: "/products?category=sofa", label: "Sofa" },
  { href: "/products?category=ban", label: "Bàn" },
  { href: "/products?category=giuong", label: "Giường" },
  { href: "/consultation", label: "Tư vấn" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-light tracking-[0.3em] text-charcoal lg:text-3xl">
          LUMINA
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="luxury-label text-stone-600 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-stone-600 transition-colors hover:text-charcoal"
            aria-label="Tìm kiếm"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/favorites"
            className="relative text-stone-600 transition-colors hover:text-charcoal"
            aria-label="Yêu thích"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-gold text-[10px] text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative text-stone-600 transition-colors hover:text-charcoal"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-gold text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="hidden text-stone-600 transition-colors hover:text-charcoal sm:block"
            aria-label="Tài khoản"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-stone-600 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-stone-200 bg-ivory px-6 py-4">
          <form action="/products" method="get" className="mx-auto flex max-w-2xl gap-4">
            <input
              name="q"
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="luxury-input flex-1"
              autoFocus
            />
            <button type="submit" className="luxury-btn-primary shrink-0 px-6">
              Tìm
            </button>
          </form>
        </div>
      )}

      <div
        className={cn(
          "overflow-hidden border-t border-stone-200 bg-ivory transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 luxury-label text-stone-600 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            onClick={() => setMobileOpen(false)}
            className="py-3 luxury-label text-stone-600 hover:text-gold"
          >
            Tài khoản
          </Link>
        </nav>
      </div>
    </header>
  );
}
