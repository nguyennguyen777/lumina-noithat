"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Heart, ShoppingBag, Minus, Plus, ArrowLeft } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data/products";
import { getCategoryName } from "@/lib/data/categories";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-500 transition-colors hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Link>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="relative aspect-square overflow-hidden bg-stone-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-20 w-20 overflow-hidden border-2 transition-colors",
                    selectedImage === i ? "border-gold" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="luxury-label mb-2">{getCategoryName(product.category)}</p>
          <h1 className="font-display text-4xl font-light md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-gold text-gold"
                      : "text-stone-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-stone-500">
              {product.rating} ({product.reviewCount} đánh giá)
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            {product.description}
          </p>

          <div className="mt-8 space-y-4 border-t border-stone-200 pt-8 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Chất liệu</span>
              <span>{product.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Kích thước</span>
              <span>{product.dimensions}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="luxury-label mb-3">Màu sắc</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "border px-4 py-2 text-xs transition-colors",
                    selectedColor === color
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-stone-300 text-stone-600 hover:border-charcoal"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <p className="luxury-label">Số lượng</p>
            <div className="flex items-center border border-stone-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-stone-500 hover:text-charcoal"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-stone-500 hover:text-charcoal"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingBag className="h-4 w-4" />
              Thêm vào giỏ
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleFavorite(product)}
              className={cn(favorited && "border-red-300 text-red-500")}
            >
              <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
              {favorited ? "Đã lưu" : "Yêu thích"}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-stone-200 pt-24">
          <h2 className="luxury-heading mb-12 text-3xl">Sản phẩm liên quan</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
