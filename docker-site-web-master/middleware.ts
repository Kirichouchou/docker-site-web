// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Pas de middleware nécessaire pour un site vitrine
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
