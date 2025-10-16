import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../../../lib/prisma";
import { requireAdmin } from "../../../../../../lib/secure";

const schema = z.object({ email: z.string().email().max(255) });

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { email } = schema.parse(body);
  const lower = email.toLowerCase();

  try {
    const updated = await prisma.user.update({ where: { id: params.id }, data: { email: lower } });
    console.log(`[AUDIT] ${auth.email} changed email for user ${params.id} -> ${lower}`);
    return NextResponse.json({ id: updated.id, email: updated.email });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

