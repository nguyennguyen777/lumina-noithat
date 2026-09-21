import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="luxury-label mb-4">Nổi bật</p>
            <h2 className="luxury-heading text-4xl md:text-5xl">
              Sản phẩm được yêu thích
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-600 transition-colors hover:text-gold"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
