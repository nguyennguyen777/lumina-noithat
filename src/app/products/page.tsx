"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilter } from "@/components/products/ProductFilter";
import { products } from "@/lib/data/products";
import { Search } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialQuery = searchParams.get("q") ?? "";

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    if (priceRange !== "all") {
      if (priceRange === "50000000+") {
        result = result.filter((p) => p.price >= 50000000);
      } else {
        const [min, max] = priceRange.split("-").map(Number);
        result = result.filter((p) => p.price >= min && p.price <= max);
      }
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="mb-12 text-center">
        <p className="luxury-label mb-4">Bộ sưu tập</p>
        <h1 className="luxury-heading text-4xl md:text-5xl">Sản phẩm</h1>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="luxury-input pl-7"
          />
        </div>
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="luxury-btn-outline px-6 lg:hidden"
        >
          Bộ lọc
        </button>
      </div>

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <div className={`${mobileFilterOpen ? "block" : "hidden"} lg:block`}>
          <ProductFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>

        <div>
          <p className="mb-6 text-sm text-stone-500">
            {filteredProducts.length} sản phẩm
          </p>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-stone-500">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-40 text-center">Đang tải...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
