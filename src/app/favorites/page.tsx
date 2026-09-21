"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <Heart className="mx-auto h-12 w-12 text-stone-300" />
        <h1 className="mt-6 font-display text-3xl font-light">
          Chưa có sản phẩm yêu thích
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          Lưu sản phẩm bạn thích để xem lại sau
        </p>
        <Link href="/products" className="luxury-btn-primary mt-8 inline-flex">
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <h1 className="luxury-heading mb-12 text-4xl">
        Sản phẩm yêu thích
        <span className="ml-3 text-lg text-stone-400">({favorites.length})</span>
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
