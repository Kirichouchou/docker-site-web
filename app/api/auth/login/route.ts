// app/api/auth/login/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { signAccessToken } from "@/lib/jwt";
import { assertLoginPayload } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { email, password } = assertLoginPayload(json);

    // ⚠️ Patch: on caste en any car ton schéma User ne contient pas (encore) passwordHash/role
    const user = (await prisma.user.findUnique({
      where: { email },
    })) as any;

    if (!user) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    // On accepte 'passwordHash' OU 'password' (si ta colonne s'appelle ainsi)
    const hash: unknown = user.passwordHash ?? user.password;

    if (typeof hash !== "string" || hash.length < 10) {
      // Pas de hash exploitable → schéma mal configuré
      return NextResponse.json({ error: "Compte mal configuré" }, { status: 500 });
    }

    const ok = await comparePassword(password, hash);
    if (!ok) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    // Rôle par défaut si la colonne n'existe pas encore
    const role = ((user.role as string) ?? "USER") as "ADMIN" | "USER";

    const token = signAccessToken({ sub: String(user.id), role });

    const res = NextResponse.json({ ok: true });
    const isProd = process.env.NODE_ENV === "production";

res.cookies.set("access_token", token, {
  httpOnly: true,
  secure: isProd,   // 🚀 false en localhost
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24,
});


    return res;
  } catch (err: any) {
    const code = err?.message;
    if (code === "INVALID_BODY" || code === "INVALID_EMAIL" || code === "INVALID_PASSWORD") {
      return NextResponse.json({ error: "Format de requête invalide" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
