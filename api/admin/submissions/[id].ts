import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDb } from "../../../server/mongodb.js";
import { requireAuth } from "../../../server/auth.js";

const patchSchema = z.object({ status: z.enum(["New", "Read", "Responded"]) });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  const raw = req.query.id;
  const id = (Array.isArray(raw) ? raw[0] : raw || "").toString();
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id" });
  const _id = new ObjectId(id);

  try {
    const db = await getDb();
    const col = db.collection("contactSubmissions");

    if (req.method === "PATCH") {
      const parsed = patchSchema.safeParse(req.body ?? {});
      if (!parsed.success) return res.status(400).json({ error: "Invalid status" });
      await col.updateOne({ _id }, { $set: { status: parsed.data.status } });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      await col.deleteOne({ _id });
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("submission update error", e);
    return res.status(500).json({ error: "Action failed. Please try again." });
  }
}
