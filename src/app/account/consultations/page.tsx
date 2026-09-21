"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

const mockConsultations = [
  {
    id: "1",
    date: "25/09/2024",
    time: "14:00",
    status: "confirmed" as const,
    note: "Tư vấn thiết kế phòng khách 40m²",
  },
  {
    id: "2",
    date: "10/08/2024",
    time: "10:00",
    status: "completed" as const,
    note: "Tư vấn bộ sofa và bàn trà",
  },
];

const statusMap = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-600" },
  confirmed: { label: "Đã xác nhận", color: "text-green-600" },
  completed: { label: "Hoàn thành", color: "text-stone-500" },
  cancelled: { label: "Đã hủy", color: "text-red-500" },
};

export default function ConsultationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-20">
      <Link
        href="/account"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-500 hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" />
        Tài khoản
      </Link>

      <div className="mb-12 flex items-center justify-between">
        <h1 className="luxury-heading text-4xl">Lịch tư vấn</h1>
        <Link href="/consultation" className="luxury-btn-outline px-6 py-2.5 text-[10px]">
          Đặt lịch mới
        </Link>
      </div>

      <div className="space-y-4">
        {mockConsultations.map((c) => (
          <div key={c.id} className="flex gap-4 bg-white p-6 shadow-sm">
            <Calendar className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">
                  {c.date} — {c.time}
                </p>
                <span className={`text-xs ${statusMap[c.status].color}`}>
                  {statusMap[c.status].label}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-500">{c.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
