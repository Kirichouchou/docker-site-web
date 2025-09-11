import "server-only";
import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "change_me";

export type JwtPayload = { sub: string; email?: string; role?: "ADMIN" | "USER"; type?: "access" | "reset" } & Record<string, unknown>;

export function signToken(payload: JwtPayload, options: SignOptions = { expiresIn: "15m" }) {
  return jwt.sign(payload, JWT_SECRET, options);
}

export function signAccessToken(payload: Omit<JwtPayload, "type">, expiresIn: string | number = "30m") {
  return jwt.sign({ ...payload, type: "access" }, JWT_SECRET, { expiresIn });
}

export function signResetToken(payload: Omit<JwtPayload, "type">, expiresIn: string | number = "30m") {
  return jwt.sign({ ...payload, type: "reset" }, JWT_SECRET, { expiresIn });
}

export function verifyToken<T extends object = JwtPayload>(token: string, options?: VerifyOptions): T | null {
  try {
    return jwt.verify(token, JWT_SECRET, options) as T;
  } catch {
    return null;
  }
}

export function verifyAccessToken<T extends object = JwtPayload>(token: string, options?: VerifyOptions): T | null {
  return verifyToken<T>(token, options);
}
