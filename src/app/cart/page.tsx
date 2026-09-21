"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-stone-300" />
        <h1 className="mt-6 font-display text-3xl font-light">Giỏ hàng trống</h1>
        <p className="mt-3 text-sm text-stone-500">
          Khám phá bộ sưu tập nội thất cao cấp của LUMINA
        </p>
        <Link href="/products" className="luxury-btn-primary mt-8 inline-flex">
          Xem sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <h1 className="luxury-heading mb-12 text-4xl">
        Giỏ hàng
        <span className="ml-3 text-lg text-stone-400">({totalItems} sản phẩm)</span>
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-6 border-b border-stone-200 pb-6"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative h-32 w-28 shrink-0 overflow-hidden bg-stone-100"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-display text-lg font-light hover:text-gold"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-stone-500">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-stone-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2.5 py-1.5 text-stone-500 hover:text-charcoal"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-2.5 py-1.5 text-stone-500 hover:text-charcoal"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-stone-400 transition-colors hover:text-red-500"
                    aria-label="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="hidden text-sm font-medium sm:block">
                {formatPrice(product.price * quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="h-fit bg-white p-8 shadow-sm">
          <h2 className="luxury-label mb-6">Tóm tắt đơn hàng</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Tạm tính</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Vận chuyển</span>
              <span>Miễn phí</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between border-t border-stone-200 pt-6">
            <span className="font-medium">Tổng cộng</span>
            <span className="text-lg font-medium">{formatPrice(totalPrice)}</span>
          </div>

          <Button className="mt-8 w-full">Tiến hành đặt hàng</Button>
          <Link
            href="/products"
            className="mt-4 block text-center text-xs uppercase tracking-luxury text-stone-500 transition-colors hover:text-charcoal"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
