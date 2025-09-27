export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { isEmail } from "@/lib/validation";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.warn("⚠️ SMTP non configuré → pas d'envoi d'email");
      return new Response(
        JSON.stringify({ ok: true, mail: false, error: "SMTP non configuré" }),
        { status: 200 }
      );
    }

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

    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT!);
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    const secure = port === 465;

    const nm = await import("nodemailer");
    const transporter = nm.default.createTransport({ host, port, secure, auth: { user, pass } });

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
