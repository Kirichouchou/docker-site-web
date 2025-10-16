import "server-only";
// Use bcryptjs (pure JS) for serverless compatibility on Vercel
import bcrypt from "bcryptjs";

const ROUNDS = 10;

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, ROUNDS);
}

export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
