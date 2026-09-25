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
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  if (!loading && !user) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center lg:py-32">
        <User className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-6 font-display text-4xl font-light">
          Tài khoản LUMINA
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          Đăng nhập để quản lý đơn hàng, lịch tư vấn và sản phẩm yêu thích.
        </p>
        <Link href="/account/login" className="luxury-btn-primary mt-8">
          Đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
          <User className="h-8 w-8 text-stone-400" />
        </div>
        <h1 className="font-display text-3xl font-light">
          Xin chào, {user?.name ?? "bạn"}
        </h1>
        <p className="mt-2 text-sm text-stone-500">{user?.email}</p>
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

      <div className="mt-8 flex items-center justify-center gap-6">
        {user?.role === "ADMIN" && (
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-400 transition-colors hover:text-gold"
          >
            <Shield className="h-4 w-4" /> Admin Dashboard
          </Link>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs uppercase tracking-luxury text-stone-400 transition-colors hover:text-charcoal"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
