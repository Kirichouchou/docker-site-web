import "server-only";
import nodemailer, { Transporter } from "nodemailer";

const globalForMailer = globalThis as unknown as { transporter?: Transporter };

function createTransporter(): Transporter {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your environment.");
  }

  const secure = port === 465; // true for port 465, false for others

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export const transporter: Transporter =
  globalForMailer.transporter || createTransporter();

if (process.env.NODE_ENV !== "production") globalForMailer.transporter = transporter;

