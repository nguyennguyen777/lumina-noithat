import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serializeProduct, slugify } from "@/lib/product-db";

async function requireAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}

export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: "Bạn không có quyền truy cập." },
      { status: 403 },
    );
  }

  const query = new URL(request.url).searchParams.get("q")?.trim();
  const category = new URL(request.url).searchParams.get("category")?.trim();
  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(query
        ? { OR: [{ name: { contains: query } }, { slug: { contains: query } }] }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products: products.map(serializeProduct) });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: "Bạn không có quyền thực hiện thao tác này." },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category =
      typeof body.category === "string" ? body.category.trim() : "";
    const price = Number(body.price);

    if (!name || !category || !Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: "Tên, danh mục và giá sản phẩm là bắt buộc." },
        { status: 400 },
      );
    }

    const baseSlug =
      slugify(typeof body.slug === "string" ? body.slug : name) || randomUUID();
    const slug = `${baseSlug}-${randomUUID().slice(0, 6)}`;
    const product = await prisma.product.create({
      data: {
        id: randomUUID(),
        slug,
        name,
        category,
        price: Math.round(price),
        originalPrice: body.originalPrice
          ? Math.round(Number(body.originalPrice))
          : null,
        description:
          typeof body.description === "string" ? body.description.trim() : "",
        material: typeof body.material === "string" ? body.material.trim() : "",
        dimensions:
          typeof body.dimensions === "string" ? body.dimensions.trim() : "",
        colors: JSON.stringify(Array.isArray(body.colors) ? body.colors : []),
        images: JSON.stringify(Array.isArray(body.images) ? body.images : []),
        featured: body.featured === true,
        isNew: body.isNew === true,
      },
    });

    return NextResponse.json(
      { product: serializeProduct(product) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Không thể tạo sản phẩm." },
      { status: 500 },
    );
  }
}
