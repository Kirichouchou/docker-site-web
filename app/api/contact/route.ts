export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mail";
import { isEmail } from "@/lib/validation";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload> | null;
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !isEmail(email) || !subject || !message) {
      return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
    }

    const to = process.env.SUPPORT_TO || process.env.SMTP_USER;
    if (!to) {
      return NextResponse.json({ error: "Configuration email manquante" }, { status: 500 });
    }

    const fromAddr = process.env.SMTP_USER || "no-reply@example.com";

    const text = [
      `Nom: ${name}`,
      `Email: ${email}`,
      `Sujet: ${subject}`,
      "",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `Site Web <${fromAddr}>`,
      to,
      replyTo: email,
      subject: subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

