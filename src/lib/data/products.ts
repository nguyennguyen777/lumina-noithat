import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    slug: "sofa-milano-luxe",
    name: "Sofa Milano Luxe",
    category: "sofa",
    price: 45900000,
    originalPrice: 52900000,
    description:
      "Sofa ba chỗ bọc da Ý cao cấp, khung gỗ sồi bền vững. Thiết kế đường cong mềm mại, phù hợp phòng khách hiện đại.",
    material: "Da Ý Nappa, Gỗ Sồi",
    dimensions: "220 × 95 × 78 cm",
    colors: ["Cognac", "Charcoal", "Ivory"],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 24,
  },
  {
    id: "2",
    slug: "ban-an-aurora",
    name: "Bàn Ăn Aurora",
    category: "ban",
    price: 28500000,
    description:
      "Bàn ăn 8 ghế mặt đá Carrara, chân kim loại mạ vàng champagne. Biểu tượng của sự sang trọng trong không gian dining.",
    material: "Đá Carrara, Thép mạ vàng",
    dimensions: "240 × 100 × 75 cm",
    colors: ["Trắng Carrara", "Đen Marquina"],
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 18,
  },
  {
    id: "3",
    slug: "ghe-velvet-noir",
    name: "Ghế Velvet Noir",
    category: "ghe",
    price: 8900000,
    description:
      "Armchair bọc nhung cao cấp với chân vàng đồng. Hoàn hảo cho góc đọc sách hoặc phòng khách.",
    material: "Nhung, Kim loại mạ đồng",
    dimensions: "75 × 82 × 85 cm",
    colors: ["Midnight Blue", "Emerald", "Blush"],
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 31,
  },
  {
    id: "4",
    slug: "giuong-serenity",
    name: "Giường Serenity",
    category: "giuong",
    price: 38500000,
    description:
      "Giường king size với headboard bọc vải cao cấp, hệ thống lưu trữ thông minh tích hợp.",
    material: "Vải linen, Gỗ óc chó",
    dimensions: "200 × 220 × 120 cm",
    colors: ["Sand", "Slate", "Pearl"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 15,
  },
  {
    id: "5",
    slug: "tu-wardrobe-prima",
    name: "Tủ Quần Áo Prima",
    category: "tu",
    price: 52000000,
    description:
      "Tủ quần áo walk-in closet thiết kế tùy biến, cánh kính cường lực, hệ thống chiếu sáng LED.",
    material: "Gỗ óc chó, Kính cường lực",
    dimensions: "300 × 60 × 240 cm",
    colors: ["Walnut", "Oak Natural"],
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 9,
  },
  {
    id: "6",
    slug: "den-chandelier-celestia",
    name: "Đèn Chandelier Celestia",
    category: "den",
    price: 15800000,
    description:
      "Đèn chùm pha lê thủ công với 12 bóng LED. Tạo điểm nhấn ánh sáng nghệ thuật cho không gian.",
    material: "Pha lê K9, Kim loại mạ vàng",
    dimensions: "Ø 80 × 65 cm",
    colors: ["Champagne Gold", "Brushed Nickel"],
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
    ],
    featured: true,
    rating: 5.0,
    reviewCount: 12,
  },
  {
    id: "7",
    slug: "decor-sculpture-aura",
    name: "Tượng Điêu Khắc Aura",
    category: "decor",
    price: 3200000,
    description:
      "Tác phẩm điêu khắc trừu tượng bằng đá cẩm thạch nhân tạo, chân đế đá granite.",
    material: "Đá cẩm thạch, Granite",
    dimensions: "35 × 20 × 45 cm",
    colors: ["White Marble", "Black Marble"],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    ],
    isNew: true,
    rating: 4.6,
    reviewCount: 7,
  },
  {
    id: "8",
    slug: "sofa-modular-eclipse",
    name: "Sofa Modular Eclipse",
    category: "sofa",
    price: 62000000,
    description:
      "Bộ sofa modular linh hoạt, có thể tùy biến cấu hình. Bọc vải performance cao cấp chống bám bụi.",
    material: "Vải performance, Gỗ tần bì",
    dimensions: "320 × 160 × 75 cm",
    colors: ["Stone Grey", "Warm Taupe"],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 20,
  },
  {
    id: "9",
    slug: "ban-coffee-horizon",
    name: "Bàn Trà Horizon",
    category: "ban",
    price: 12500000,
    description:
      "Bàn trà oval mặt gỗ óc chó nguyên khối, chân kim loại sơn tĩnh điện matte black.",
    material: "Gỗ óc chó, Thép sơn tĩnh điện",
    dimensions: "130 × 70 × 42 cm",
    colors: ["Walnut Natural"],
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&q=80",
    ],
    rating: 4.5,
    reviewCount: 14,
  },
  {
    id: "10",
    slug: "den-floor-lumiere",
    name: "Đèn Sàn Lumière",
    category: "den",
    price: 6800000,
    description:
      "Đèn sàn arc điều chỉnh độ cao, ánh sáng ấm 2700K. Thiết kế tối giản Scandinavian.",
    material: "Thép sơn tĩnh điện, Vải linen",
    dimensions: "180 × 40 cm",
    colors: ["Matte Black", "Brass"],
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 22,
  },
  {
    id: "11",
    slug: "ghe-dining-eloise",
    name: "Ghế Dining Eloise",
    category: "ghe",
    price: 4500000,
    description:
      "Ghế ăn bọc da PU cao cấp, khung thép mạ vàng. Set 6 ghế giảm 10%.",
    material: "Da PU, Thép mạ vàng",
    dimensions: "48 × 55 × 88 cm",
    colors: ["Tan", "Black"],
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
    ],
    rating: 4.4,
    reviewCount: 28,
  },
  {
    id: "12",
    slug: "decor-mirror-infinity",
    name: "Gương Trang Trí Infinity",
    category: "decor",
    price: 8900000,
    description:
      "Gương trang trí khung vàng champagne, thiết kế geometric hiện đại.",
    material: "Gương tráng bạc, Khung kim loại",
    dimensions: "90 × 90 cm",
    colors: ["Gold Frame", "Silver Frame"],
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 11,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
