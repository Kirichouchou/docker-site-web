export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mail";
import { isEmail } from "@/lib/validation";

type CommandePayload = {
  name: string;
  email: string;
  message: string;
  options?: unknown;
};

function formatOptions(options: unknown): string {
  if (options == null) return "(aucune)";
  if (Array.isArray(options)) {
    return options.map((o) => `- ${String(o)}`).join("\n");
  }
  if (typeof options === "object") {
    return Object.entries(options as Record<string, unknown>)
      .map(([k, v]) => `- ${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
      .join("\n");
  }
  return String(options);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CommandePayload> | null;
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const options = body?.options as unknown;

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
    }

    const to = process.env.COMMANDE_TO || process.env.SMTP_USER;
    if (!to) {
      return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 });
    }

    const fromAddr = process.env.SMTP_USER || "no-reply@example.com";
    const optionsSummary = formatOptions(options);

    const text = [
      `Nouvelle commande`,
      `Nom: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
      "",
      "Options:",
      optionsSummary,
    ].join("\n");

    await transporter.sendMail({
      from: `Site Web <${fromAddr}>`,
      to,
      replyTo: email,
      subject: `Commande - ${name}`,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

