"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
        alt="LUMINA Interior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-ivory">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="luxury-label mb-6 text-gold-light"
        >
          Nội thất hiện đại
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl font-light leading-tight md:text-7xl lg:text-8xl"
        >
          Không gian sống
          <br />
          <span className="italic text-gold-light">Nghệ thuật sống</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-300 md:text-lg"
        >
          LUMINA kiến tạo không gian sống đẳng cấp với từng đường nét tinh tế,
          vật liệu cao cấp và thiết kế vượt thời gian.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/products" className="luxury-btn-gold group">
            Khám phá bộ sưu tập
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center gap-2 border border-ivory/40 px-8 py-3.5 text-xs uppercase tracking-luxury text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory/10"
          >
            Đặt lịch tư vấn
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="luxury-label text-stone-400">Cuộn xuống</span>
          <div className="h-12 w-px animate-pulse bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
