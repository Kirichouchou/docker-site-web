import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, name: true, amount: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(
    products.map((p: any) => ({ id: p.id, name: p.name, priceCents: p.amount }))
  );
}
