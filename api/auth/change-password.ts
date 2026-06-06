import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb } from "../../server/mongodb";
import { requireAuth } from "../../server/auth";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = requireAuth(req, res);
  if (!session) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = schema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: "New password must be at least 6 characters." });
  }

  try {
    const db = await getDb();
    const admin = await db.collection("admins").findOne({ email: session.email });
    if (!admin || !(await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash))) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }
    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 10);
    await db.collection("admins").updateOne({ email: session.email }, { $set: { passwordHash } });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("change-password error", e);
    return res.status(500).json({ error: "Could not change password." });
  }
}
