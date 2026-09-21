export type CategorySlug =
  | "sofa"
  | "ban"
  | "ghe"
  | "giuong"
  | "tu"
  | "den"
  | "decor";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  description: string;
  material: string;
  dimensions: string;
  colors: string[];
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ConsultationBooking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  note?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "confirmed" | "production" | "shipping" | "delivered";
  total: number;
  items: { product: Product; quantity: number }[];
}
