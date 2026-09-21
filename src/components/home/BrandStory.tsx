"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function BrandStory() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
            alt="LUMINA Showroom"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="luxury-label mb-4">Về LUMINA</p>
          <h2 className="luxury-heading mb-8 text-4xl md:text-5xl">
            Nghệ thuật
            <br />
            trong từng chi tiết
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-stone-600">
            <p>
              LUMINA ra đời từ niềm đam mê kiến tạo không gian sống hoàn hảo.
              Mỗi sản phẩm được chế tác tỉ mỉ từ vật liệu cao cấp, kết hợp
              thiết kế hiện đại và tay nghề thủ công truyền thống.
            </p>
            <p>
              Chúng tôi tin rằng ngôi nhà không chỉ là nơi ở — mà là biểu tượng
              của phong cách sống, nơi cảm xúc và thẩm mỹ hòa quyện.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-8 border-t border-stone-200 pt-10">
            {[
              { value: "15+", label: "Năm kinh nghiệm" },
              { value: "500+", label: "Dự án hoàn thành" },
              { value: "98%", label: "Khách hài lòng" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-light text-gold">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
