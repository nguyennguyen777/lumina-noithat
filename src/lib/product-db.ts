import type { Product } from "@/lib/types";

export function serializeProduct(product: {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  description: string;
  material: string;
  dimensions: string;
  colors: string;
  images: string;
  featured: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
}): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category as Product["category"],
    price: product.price,
    originalPrice: product.originalPrice ?? undefined,
    description: product.description,
    material: product.material,
    dimensions: product.dimensions,
    colors: JSON.parse(product.colors) as string[],
    images: JSON.parse(product.images) as string[],
    featured: product.featured,
    isNew: product.isNew,
    rating: product.rating,
    reviewCount: product.reviewCount,
  };
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
