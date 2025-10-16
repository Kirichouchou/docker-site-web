import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { hashPassword } from "../../../../lib/password";
export const runtime = "nodejs";

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(8).max(200),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = schema.parse(body);
    const payload = verifyToken<any>(token);
    if (!payload || payload.type !== "reset" || !payload.sub) {
      return NextResponse.json({ error: "Jeton invalide" }, { status: 400 });
    }
    const passwordHash = await hashPassword(password);
    await prisma.user.update({ where: { id: payload.sub }, data: { passwordHash } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: "Entrées invalides" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
