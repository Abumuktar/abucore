import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb } from "../../server/mongodb";
import { signSession, setSessionCookie } from "../../server/auth";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const email = parsed.data.email.toLowerCase();

  try {
    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email });
    if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = signSession({ sub: String(admin._id), email });
    setSessionCookie(res, token);
    return res.status(200).json({ email });
  } catch (e) {
    console.error("login error", e);
    return res.status(500).json({ error: "Login failed. Please try again." });
  }
}
