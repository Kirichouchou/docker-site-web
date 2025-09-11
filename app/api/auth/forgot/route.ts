import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { signResetToken } from "../../../../lib/jwt";
export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().max(255),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);
    const lower = email.toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: lower } });
    if (!user) {
      // Do not reveal user existence
      return NextResponse.json({ ok: true });
    }

    const token = signResetToken({ sub: user.id, email: user.email, role: user.role }, "30m");
    // In production, send the token by email with a reset link.
    // For now, we just return ok=true (no token exposure).
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: "Entrées invalides" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
