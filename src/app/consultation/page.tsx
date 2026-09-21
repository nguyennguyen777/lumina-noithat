"use client";

import { useState, FormEvent } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    note: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-6 py-32 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-gold" />
        <h1 className="mt-6 font-display text-3xl font-light">
          Đặt lịch thành công!
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          Cảm ơn bạn đã đặt lịch tư vấn. Đội ngũ LUMINA sẽ liên hệ xác nhận
          trong vòng 24 giờ.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", email: "", date: "", time: "", note: "" });
          }}
        >
          Đặt lịch mới
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Calendar className="mb-6 h-8 w-8 text-gold" />
          <p className="luxury-label mb-4">Tư vấn miễn phí</p>
          <h1 className="luxury-heading text-4xl md:text-5xl">
            Đặt lịch tư vấn
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            Hãy để đội ngũ designer chuyên nghiệp của LUMINA giúp bạn biến
            không gian mơ ước thành hiện thực. Buổi tư vấn hoàn toàn miễn phí
            tại showroom hoặc tại nhà.
          </p>

          <div className="mt-10 space-y-6">
            {[
              { step: "01", title: "Đặt lịch", desc: "Chọn thời gian phù hợp" },
              { step: "02", title: "Tư vấn", desc: "Designer lắng nghe nhu cầu" },
              { step: "03", title: "Thiết kế", desc: "Bản thiết kế 3D miễn phí" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="font-display text-2xl font-light text-gold">
                  {item.step}
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm lg:p-10">
          <h2 className="luxury-label mb-8">Thông tin liên hệ</h2>

          <div className="space-y-6">
            <div>
              <label className="luxury-label mb-2 block">Họ và tên *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="luxury-input"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="luxury-label mb-2 block">Số điện thoại *</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="luxury-input"
                placeholder="0901 234 567"
              />
            </div>
            <div>
              <label className="luxury-label mb-2 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="luxury-input"
                placeholder="email@example.com"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="luxury-label mb-2 block">Ngày *</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="luxury-input"
                />
              </div>
              <div>
                <label className="luxury-label mb-2 block">Giờ *</label>
                <select
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="luxury-input"
                >
                  <option value="">Chọn giờ</option>
                  {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div>
              <label className="luxury-label mb-2 block">Ghi chú</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={3}
                className="w-full resize-none border-b border-stone-300 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-gold"
                placeholder="Mô tả không gian, phong cách mong muốn..."
              />
            </div>
          </div>

          <Button type="submit" variant="gold" className="mt-10 w-full">
            Xác nhận đặt lịch
          </Button>
        </form>
      </div>
    </div>
  );
}
