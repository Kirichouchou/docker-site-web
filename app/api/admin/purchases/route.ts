import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/secure";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const rows = await prisma.purchase.findMany({
    include: {
      user: { select: { email: true } },
      product: { select: { name: true, amount: true } },
    },
    orderBy: { paidAt: "desc" },
  });

  return NextResponse.json(
    rows.map((r: any) => ({
      id: r.id,
      userEmail: r.user.email,
      productName: r.product.name,
      priceCents: r.product.amount,
      paidAt: r.paidAt,
      accessActive: r.accessActive,
    }))
  );
}
