"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Calendar,
  Star,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

const stats = [
  { label: "Doanh thu tháng", value: formatPrice(285000000), icon: TrendingUp },
  { label: "Đơn hàng mới", value: "12", icon: ShoppingCart },
  { label: "Lịch tư vấn", value: "8", icon: Calendar },
  { label: "Sản phẩm", value: "48", icon: Package },
];

const adminModules = [
  { icon: Package, title: "Quản lý sản phẩm", desc: "CRUD sản phẩm, upload ảnh" },
  { icon: FolderTree, title: "Quản lý danh mục", desc: "7 danh mục chính" },
  { icon: ShoppingCart, title: "Quản lý đơn hàng", desc: "Duyệt, cập nhật trạng thái" },
  { icon: Users, title: "Quản lý khách hàng", desc: "Danh sách, lịch sử mua" },
  { icon: Calendar, title: "Quản lý lịch tư vấn", desc: "Calendar, assign consultant" },
  { icon: Star, title: "Quản lý review", desc: "Duyệt / ẩn đánh giá" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-charcoal px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-gold" />
            <span className="font-display text-xl tracking-wide text-ivory">
              LUMINA Admin
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-400 hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" />
            Về website
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <h1 className="mb-8 text-2xl font-medium">Dashboard</h1>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-gold" />
              </div>
              <p className="mt-3 text-2xl font-light">{stat.value}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-lg font-medium">Quản lý</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((mod) => (
            <div
              key={mod.title}
              className="cursor-default bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <mod.icon className="mb-4 h-6 w-6 text-gold" />
              <p className="font-medium">{mod.title}</p>
              <p className="mt-1 text-xs text-stone-500">{mod.desc}</p>
              <span className="mt-4 inline-block text-[10px] uppercase tracking-luxury text-stone-400">
                Demo — Phase 2
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
