export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";
import { catalogue } from "@/lib/catalogue";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;
    if (!token) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const payload = verifyAccessToken(token) as { sub: string; type: "access" };
    if (!payload?.sub) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    const userId = payload.sub;

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { accesses: { some: { userId } } },
          { purchases: { some: { userId, accessActive: true } } },
        ],
      },
      select: { id: true, key: true, name: true, amount: true },
      orderBy: { name: "asc" },
    });

    const trainings = products.map((p: any) => ({
      product: p,
      modules: (catalogue[p.key] ?? []).slice().sort((a, b) => a.order - b.order),
    }));

    return NextResponse.json({ ok: true, trainings });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
