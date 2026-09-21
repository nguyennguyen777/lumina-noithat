"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  Calendar,
  Settings,
  ChevronRight,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    href: "/account/orders",
    icon: Package,
    title: "Đơn hàng của tôi",
    desc: "Xem lịch sử và theo dõi đơn hàng",
  },
  {
    href: "/favorites",
    icon: Heart,
    title: "Sản phẩm yêu thích",
    desc: "Danh sách sản phẩm đã lưu",
  },
  {
    href: "/account/consultations",
    icon: Calendar,
    title: "Lịch tư vấn",
    desc: "Xem và quản lý lịch hẹn",
  },
  {
    href: "/account/settings",
    icon: Settings,
    title: "Cài đặt tài khoản",
    desc: "Thông tin cá nhân, địa chỉ",
  },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
          <User className="h-8 w-8 text-stone-400" />
        </div>
        <h1 className="font-display text-3xl font-light">Xin chào, Khách</h1>
        <p className="mt-2 text-sm text-stone-500">
          Demo tài khoản — đăng nhập sẽ được tích hợp ở phase backend
        </p>
      </div>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-4 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <item.icon className="h-5 w-5 text-gold" />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-stone-500">{item.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-stone-300 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      <Link
        href="/admin"
        className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-luxury text-stone-400 transition-colors hover:text-gold"
      >
        <Shield className="h-4 w-4" />
        Xem demo Admin Dashboard
      </Link>
    </div>
  );
}
