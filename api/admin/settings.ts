import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getDb } from "../../server/mongodb.js";
import { requireAuth } from "../../server/auth.js";

const serviceSchema = z.object({
  key: z.string(),
  label: z.string().trim().min(1),
  active: z.boolean(),
});

const patchSchema = z.object({
  companyPhone: z.string().trim().optional(),
  companyEmail: z.string().trim().email().optional().or(z.literal("")),
  activeServices: z.array(serviceSchema).optional(),
});

const DEFAULTS = {
  companyPhone: "09138266715",
  companyEmail: "abucoreenterprises@gmail.com",
  activeServices: [] as { key: string; label: string; active: boolean }[],
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  try {
    const db = await getDb();
    const col = db.collection("settings");

    if (req.method === "GET") {
      const doc: any = (await col.findOne({ _id: "site" as any })) || {};
      return res.status(200).json({
        companyPhone: doc.companyPhone ?? DEFAULTS.companyPhone,
        companyEmail: doc.companyEmail ?? DEFAULTS.companyEmail,
        activeServices: doc.activeServices ?? DEFAULTS.activeServices,
      });
    }

    if (req.method === "PATCH") {
      const parsed = patchSchema.safeParse(req.body ?? {});
      if (!parsed.success) return res.status(400).json({ error: "Invalid settings." });
      const update: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(parsed.data)) {
        if (v !== undefined) update[k] = v;
      }
      await col.updateOne({ _id: "site" as any }, { $set: update }, { upsert: true });
      const doc: any = await col.findOne({ _id: "site" as any });
      return res.status(200).json({
        companyPhone: doc?.companyPhone ?? DEFAULTS.companyPhone,
        companyEmail: doc?.companyEmail ?? DEFAULTS.companyEmail,
        activeServices: doc?.activeServices ?? DEFAULTS.activeServices,
      });
    }

    res.setHeader("Allow", "GET, PATCH");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("settings error", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
