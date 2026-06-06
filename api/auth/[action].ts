import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb } from "../../server/mongodb.js";
import {
  signSession,
  setSessionCookie,
  clearSessionCookie,
  getSession,
  requireAuth,
} from "../../server/auth.js";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

// Consolidated auth endpoint: /api/auth/login | me | logout | change-password
// (kept as one function to stay within Vercel's Hobby function limit).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.action;
  const action = (Array.isArray(raw) ? raw[0] : raw || "").toString();

  try {
    if (action === "login") {
      if (req.method !== "POST") return methodNotAllowed(res, "POST");
      const parsed = loginSchema.safeParse(req.body ?? {});
      if (!parsed.success) return res.status(400).json({ error: "Email and password are required." });
      const email = parsed.data.email.toLowerCase();
      const db = await getDb();
      const admin = await db.collection("admins").findOne({ email });
      if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) {
        return res.status(401).json({ error: "Invalid email or password." });
      }
      setSessionCookie(res, signSession({ sub: String(admin._id), email }));
      return res.status(200).json({ email });
    }

    if (action === "me") {
      const session = getSession(req);
      if (!session) return res.status(401).json({ error: "Unauthorized" });
      return res.status(200).json({ email: session.email });
    }

    if (action === "logout") {
      clearSessionCookie(res);
      return res.status(200).json({ ok: true });
    }

    if (action === "change-password") {
      const session = requireAuth(req, res);
      if (!session) return;
      if (req.method !== "POST") return methodNotAllowed(res, "POST");
      const parsed = passwordSchema.safeParse(req.body ?? {});
      if (!parsed.success) {
        return res.status(400).json({ error: "New password must be at least 6 characters." });
      }
      const db = await getDb();
      const admin = await db.collection("admins").findOne({ email: session.email });
      if (!admin || !(await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash))) {
        return res.status(401).json({ error: "Current password is incorrect." });
      }
      const passwordHash = await bcrypt.hash(parsed.data.newPassword, 10);
      await db.collection("admins").updateOne({ email: session.email }, { $set: { passwordHash } });
      return res.status(200).json({ ok: true });
    }

    return res.status(404).json({ error: "Not found" });
  } catch (e) {
    console.error("auth error", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

function methodNotAllowed(res: VercelResponse, allow: string) {
  res.setHeader("Allow", allow);
  return res.status(405).json({ error: "Method not allowed" });
}
