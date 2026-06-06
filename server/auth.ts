import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { parse, serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "";
const COOKIE_NAME = "abucore_session";
const MAX_AGE = 60 * 60 * 24; // 24 hours, in seconds

export interface Session {
  sub: string;
  email: string;
}

export function signSession(payload: Session): string {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function setSessionCookie(res: VercelResponse, token: string) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    }),
  );
}

export function clearSessionCookie(res: VercelResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    }),
  );
}

export function getSession(req: VercelRequest): Session | null {
  try {
    const token = parse(req.headers.cookie || "")[COOKIE_NAME];
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as Session;
  } catch {
    return null;
  }
}

/** Returns the session, or writes a 401 and returns null. Usage:
 *  const session = requireAuth(req, res); if (!session) return; */
export function requireAuth(req: VercelRequest, res: VercelResponse): Session | null {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}
