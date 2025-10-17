// lib/validation.ts
import "server-only";

export function isEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type LoginPayload = { email: string; password: string };

export function assertLoginPayload(body: unknown): LoginPayload {
  if (!body || typeof body !== "object") {
    throw new Error("INVALID_BODY");
  }
  const { email, password } = body as Record<string, unknown>;

  if (!isEmail(email)) {
    throw new Error("INVALID_EMAIL");
  }
  if (typeof password !== "string" || password.length < 6) {
    throw new Error("INVALID_PASSWORD");
  }
  return { email, password } as LoginPayload;
}

