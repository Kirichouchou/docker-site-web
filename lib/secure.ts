import { NextRequest, NextResponse } from "next/server";
import { verifyToken, JwtPayload } from "./jwt";

export function getUserFromRequest(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get("authorization");
  const cookie = req.cookies.get("access_token")?.value;
  let token: string | null = null;
  if (auth?.toLowerCase().startsWith("bearer ")) token = auth.slice(7);
  else if (cookie) token = cookie;
  if (!token) return null;
  return verifyToken<JwtPayload>(token);
}

export function requireAuth(req: NextRequest): JwtPayload | NextResponse {
  const user = getUserFromRequest(req);
  if (!user || user.type !== "access") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return user;
}

export function requireAdmin(req: NextRequest): JwtPayload | NextResponse {
  const result = requireAuth(req);
  if (result instanceof NextResponse) return result;
  if (result.role !== "ADMIN") {
    return NextResponse.json({ error: "Interdit" }, { status: 403 });
  }
  return result;
}
