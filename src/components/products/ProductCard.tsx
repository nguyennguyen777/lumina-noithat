"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useFavorites } from "@/context/FavoritesContext";
import { getCategoryName } from "@/lib/data/categories";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  return (
    <article
      className="group luxury-card animate-slide-up opacity-0"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Link
          href={`/products/${product.slug}`}
          className="relative block h-full"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gold px-3 py-1 text-[10px] uppercase tracking-luxury text-white">
              Mới
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-charcoal px-3 py-1 text-[10px] uppercase tracking-luxury text-white">
              Sale
            </span>
          )}
        </div>

        <button
          onClick={() => toggleFavorite(product)}
          className={cn(
            "absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white",
            favorited && "text-red-500",
          )}
          aria-label={favorited ? "Bỏ yêu thích" : "Thêm yêu thích"}
        >
          <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-charcoal/90 px-4 py-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
          <Link
            href={`/products/${product.slug}`}
            className="block text-center text-xs uppercase tracking-luxury text-ivory"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>

      <div className="p-5">
        <p className="luxury-label mb-1">{getCategoryName(product.category)}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-lg font-light text-charcoal transition-colors hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-medium text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
