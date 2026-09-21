import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { categories } from "@/lib/data/categories";

export function Footer() {
  return (
    <footer className="bg-charcoal text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-light tracking-[0.3em] text-ivory">
              LUMINA
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Nội thất hiện đại cho không gian sống. Kiến tạo vẻ đẹp vượt thời gian
              với từng chi tiết tinh tế.
            </p>
          </div>

          <div>
            <h4 className="luxury-label mb-6 text-gold">Danh mục</h4>
            <ul className="space-y-3 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="transition-colors hover:text-gold"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="luxury-label mb-6 text-gold">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/consultation" className="transition-colors hover:text-gold">
                  Đặt lịch tư vấn
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="transition-colors hover:text-gold">
                  Theo dõi đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition-colors hover:text-gold">
                  Bộ sưu tập
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="luxury-label mb-6 text-gold">Liên hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <span>contact@lumina.vn</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-stone-400 transition-colors hover:text-gold" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 transition-colors hover:text-gold" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-stone-700 pt-8 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} LUMINA Interior. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
