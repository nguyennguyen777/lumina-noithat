"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export function ConsultationCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #C9A962 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C9A962 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Calendar className="mx-auto mb-6 h-8 w-8 text-gold" />
          <p className="luxury-label mb-4 text-gold">Tư vấn miễn phí</p>
          <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">
            Biến không gian mơ ước
            <br />
            thành hiện thực
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-stone-400">
            Đội ngũ designer chuyên nghiệp sẽ tư vấn và thiết kế không gian
            phù hợp với phong cách sống của bạn.
          </p>
          <Link href="/consultation" className="luxury-btn-gold mt-10">
            Đặt lịch tư vấn ngay
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
