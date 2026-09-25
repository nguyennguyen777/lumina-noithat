import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { products } from "../src/lib/data/products";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash(
    process.env.ADMIN_PASSWORD ?? "Admin@123",
    12,
  );

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@lumina.vn" },
    update: { passwordHash, role: "ADMIN", name: "LUMINA Admin" },
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@lumina.vn",
      name: "LUMINA Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        description: product.description,
        material: product.material,
        dimensions: product.dimensions,
        colors: JSON.stringify(product.colors),
        images: JSON.stringify(product.images),
        featured: product.featured ?? false,
        isNew: product.isNew ?? false,
        rating: product.rating,
        reviewCount: product.reviewCount,
      },
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        description: product.description,
        material: product.material,
        dimensions: product.dimensions,
        colors: JSON.stringify(product.colors),
        images: JSON.stringify(product.images),
        featured: product.featured ?? false,
        isNew: product.isNew ?? false,
        rating: product.rating,
        reviewCount: product.reviewCount,
      },
    });
  }

  console.log(`Admin account ready and ${products.length} products seeded.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
