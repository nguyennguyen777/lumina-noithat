import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-db";

async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Bạn không có quyền thực hiện thao tác này." },
      { status: 403 },
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(typeof body.name === "string" ? { name: body.name.trim() } : {}),
        ...(typeof body.category === "string"
          ? { category: body.category.trim() }
          : {}),
        ...(body.price !== undefined
          ? { price: Math.round(Number(body.price)) }
          : {}),
        ...(body.originalPrice !== undefined
          ? {
              originalPrice: body.originalPrice
                ? Math.round(Number(body.originalPrice))
                : null,
            }
          : {}),
        ...(typeof body.description === "string"
          ? { description: body.description.trim() }
          : {}),
        ...(typeof body.material === "string"
          ? { material: body.material.trim() }
          : {}),
        ...(typeof body.dimensions === "string"
          ? { dimensions: body.dimensions.trim() }
          : {}),
        ...(Array.isArray(body.colors)
          ? { colors: JSON.stringify(body.colors) }
          : {}),
        ...(Array.isArray(body.images)
          ? { images: JSON.stringify(body.images) }
          : {}),
        ...(typeof body.featured === "boolean"
          ? { featured: body.featured }
          : {}),
        ...(typeof body.isNew === "boolean" ? { isNew: body.isNew } : {}),
      },
    });

    return NextResponse.json({ product: serializeProduct(product) });
  } catch {
    return NextResponse.json(
      { error: "Không tìm thấy hoặc không thể cập nhật sản phẩm." },
      { status: 404 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Bạn không có quyền thực hiện thao tác này." },
      { status: 403 },
    );
  }

  try {
    const { id } = await context.params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Không tìm thấy sản phẩm." },
      { status: 404 },
    );
  }
}
