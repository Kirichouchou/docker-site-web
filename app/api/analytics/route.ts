import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // In real use, send to your analytics backend or 3rd party.
    console.info("analytics_event", {
      ...body,
      ip: (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "").split(",")[0],
      ua: req.headers.get("user-agent"),
      at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn("analytics_event_parse_error");
  }
  return NextResponse.json({ ok: true });
}

