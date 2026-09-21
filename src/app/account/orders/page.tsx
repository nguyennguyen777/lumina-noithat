"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const mockOrders = [
  {
    id: "LUM-2024-001",
    date: "15/09/2024",
    status: "shipping" as const,
    total: 74400000,
    items: 2,
  },
  {
    id: "LUM-2024-002",
    date: "02/08/2024",
    status: "delivered" as const,
    total: 15800000,
    items: 1,
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-600 bg-yellow-50" },
  confirmed: { label: "Đã xác nhận", color: "text-blue-600 bg-blue-50" },
  production: { label: "Đang sản xuất", color: "text-purple-600 bg-purple-50" },
  shipping: { label: "Đang giao hàng", color: "text-gold-dark bg-gold/10" },
  delivered: { label: "Hoàn thành", color: "text-green-600 bg-green-50" },
};

const trackingSteps = ["Xác nhận", "Sản xuất", "Giao hàng", "Hoàn thành"];

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-20">
      <Link
        href="/account"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-500 hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" />
        Tài khoản
      </Link>

      <h1 className="luxury-heading mb-12 text-4xl">Đơn hàng của tôi</h1>

      <div className="space-y-6">
        {mockOrders.map((order) => {
          const status = statusLabels[order.status];
          const currentStep =
            order.status === "delivered"
              ? 4
              : order.status === "shipping"
                ? 3
                : order.status === "production"
                  ? 2
                  : 1;

          return (
            <div key={order.id} className="bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="mt-1 text-xs text-stone-500">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-stone-500">
                  {order.items} sản phẩm
                </span>
                <span className="font-medium">{formatPrice(order.total)}</span>
              </div>

              {order.status !== "delivered" && (
                <div className="mt-6">
                  <div className="relative flex justify-between">
                    <div className="absolute left-4 right-4 top-4 h-0.5 bg-stone-200" />
                    <div
                      className="absolute left-4 top-4 h-0.5 bg-gold transition-all"
                      style={{
                        width: `calc(${((currentStep - 1) / (trackingSteps.length - 1)) * 100}% - 2rem)`,
                      }}
                    />
                    {trackingSteps.map((step, i) => (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                            i < currentStep
                              ? "bg-gold text-white"
                              : "bg-stone-100 text-stone-400"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <span className="mt-2 text-[10px] text-stone-500">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-3 rounded border border-dashed border-stone-300 p-6 text-sm text-stone-500">
        <Package className="h-5 w-5 shrink-0" />
        Dữ liệu demo — đơn hàng thật sẽ kết nối backend ở phase tiếp theo.
      </div>
    </div>
  );
}
