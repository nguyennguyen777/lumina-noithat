"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-12 lg:px-8 lg:py-20">
      <Link
        href="/account"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-500 hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" />
        Tài khoản
      </Link>

      <h1 className="luxury-heading mb-12 text-4xl">Cài đặt tài khoản</h1>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="luxury-label mb-2 block">Họ và tên</label>
          <input className="luxury-input" defaultValue="Nguyễn Văn A" />
        </div>
        <div>
          <label className="luxury-label mb-2 block">Email</label>
          <input className="luxury-input" type="email" defaultValue="demo@lumina.vn" />
        </div>
        <div>
          <label className="luxury-label mb-2 block">Số điện thoại</label>
          <input className="luxury-input" type="tel" defaultValue="0901 234 567" />
        </div>
        <div>
          <label className="luxury-label mb-2 block">Địa chỉ giao hàng</label>
          <textarea
            className="w-full resize-none border-b border-stone-300 bg-transparent py-3 text-sm outline-none focus:border-gold"
            rows={2}
            defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM"
          />
        </div>

        <Button type="submit" className="w-full">
          Lưu thay đổi
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-stone-400">
        Demo UI — chưa kết nối backend
      </p>
    </div>
  );
}
