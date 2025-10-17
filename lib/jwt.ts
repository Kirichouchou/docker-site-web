import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET environment variable.");
  }
  return secret;
}

export type JwtRole = "ADMIN" | "USER";

export type JwtPayload = {
  sub: string; // user id
  email?: string;
  role?: JwtRole;
  type: "access" | "reset";
};

// jsonwebtoken v9 options: extract the exact type for `expiresIn`
type Expires = NonNullable<Parameters<typeof jwt.sign>[2]> extends infer O
  ? O extends { expiresIn?: infer E }
    ? E
    : never
  : never;

export function signAccessToken(
  payload: Omit<JwtPayload, "type">,
  expiresIn: Expires = "30m" as Expires
) {
  return jwt.sign({ ...payload, type: "access" }, getJwtSecret(), { expiresIn });
}

export function signResetToken(
  payload: Omit<JwtPayload, "type">,
  expiresIn: Expires = "30m" as Expires
) {
  return jwt.sign({ ...payload, type: "reset" }, getJwtSecret(), { expiresIn });
}

export function verifyToken<T extends JwtPayload>(token: string): T {
  return jwt.verify(token, getJwtSecret()) as T;
}

export function verifyAccessToken<T extends JwtPayload>(token: string): T {
  const payload = verifyToken<T>(token);
  if (payload.type !== "access") throw new Error("Invalid token type (expected access).");
  return payload;
}

export function verifyResetToken<T extends JwtPayload>(token: string): T {
  const payload = verifyToken<T>(token);
  if (payload.type !== "reset") throw new Error("Invalid token type (expected reset).");
  return payload;
}
