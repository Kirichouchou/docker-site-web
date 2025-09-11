import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import { requireAdmin } from "../../../../../../lib/secure";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const id = params.id;
  const purchase = await prisma.purchase.findUnique({ where: { id } });
  if (!purchase) return NextResponse.json({ error: "Achat introuvable" }, { status: 404 });
  const updated = await prisma.purchase.update({ where: { id }, data: { accessActive: !purchase.accessActive } });

  // Minimal audit log to console; could persist in DB
  console.log(`[AUDIT] ${auth.email} toggled access for purchase ${id} -> ${updated.accessActive}`);

  return NextResponse.json({ id: updated.id, accessActive: updated.accessActive });
}

