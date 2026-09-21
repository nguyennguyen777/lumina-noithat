import { Category } from "../types";

export const categories: Category[] = [
  {
    slug: "sofa",
    name: "Sofa",
    description: "Ghế sofa cao cấp, thiết kế tối giản",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    slug: "ban",
    name: "Bàn",
    description: "Bàn ăn, bàn trà, bàn làm việc sang trọng",
    image:
      "https://images.unsplash.com/photo-1617806118773-12e932dec71e?w=800&q=80",
  },
  {
    slug: "ghe",
    name: "Ghế",
    description: "Ghế armchair, dining chair tinh tế",
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
  },
  {
    slug: "giuong",
    name: "Giường",
    description: "Giường ngủ master bedroom đẳng cấp",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
  },
  {
    slug: "tu",
    name: "Tủ",
    description: "Tủ quần áo, tủ trang trí hiện đại",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
  },
  {
    slug: "den",
    name: "Đèn",
    description: "Đèn chùm, đèn bàn, ánh sáng nghệ thuật",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
  },
  {
    slug: "decor",
    name: "Decor",
    description: "Phụ kiện trang trí cao cấp",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
];

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
