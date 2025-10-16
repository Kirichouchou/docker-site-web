import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../../../lib/prisma";
import { requireAdmin } from "../../../../../../lib/secure";
import { hashPassword } from "../../../../../../lib/password";

const schema = z.object({ password: z.string().min(8).max(200) });

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { password } = schema.parse(body);
  const passwordHash = await hashPassword(password);
  await prisma.user.update({ where: { id: params.id }, data: { passwordHash } });
  console.log(`[AUDIT] ${auth.email} reset password for user ${params.id}`);
  return NextResponse.json({ ok: true });
}

