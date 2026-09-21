"use client";

import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
}

const priceRanges = [
  { value: "all", label: "Tất cả giá" },
  { value: "0-10000000", label: "Dưới 10 triệu" },
  { value: "10000000-30000000", label: "10 – 30 triệu" },
  { value: "30000000-50000000", label: "30 – 50 triệu" },
  { value: "50000000+", label: "Trên 50 triệu" },
];

const sortOptions = [
  { value: "featured", label: "Nổi bật" },
  { value: "price-asc", label: "Giá thấp → cao" },
  { value: "price-desc", label: "Giá cao → thấp" },
  { value: "newest", label: "Mới nhất" },
  { value: "rating", label: "Đánh giá cao" },
];

export function ProductFilter({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
}: ProductFilterProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="luxury-label mb-4">Danh mục</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onCategoryChange(null)}
              className={cn(
                "text-sm transition-colors hover:text-gold",
                !selectedCategory ? "font-medium text-charcoal" : "text-stone-500"
              )}
            >
              Tất cả
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => onCategoryChange(cat.slug)}
                className={cn(
                  "text-sm transition-colors hover:text-gold",
                  selectedCategory === cat.slug
                    ? "font-medium text-charcoal"
                    : "text-stone-500"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="luxury-label mb-4">Khoảng giá</h3>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range.value}>
              <button
                onClick={() => onPriceRangeChange(range.value)}
                className={cn(
                  "text-sm transition-colors hover:text-gold",
                  priceRange === range.value
                    ? "font-medium text-charcoal"
                    : "text-stone-500"
                )}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="luxury-label mb-4">Sắp xếp</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-stone-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
