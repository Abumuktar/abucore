import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../server/mongodb";

// Public, read-only site settings used by the contact form (active services +
// WhatsApp number). No private data exposed.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const db = await getDb();
    const doc: any = (await db.collection("settings").findOne({ _id: "site" as any })) || {};
    const activeServices = (doc.activeServices ?? [])
      .filter((s: any) => s.active)
      .map((s: any) => s.label);
    return res.status(200).json({
      companyPhone: doc.companyPhone ?? "09138266715",
      companyEmail: doc.companyEmail ?? "abucoreenterprises@gmail.com",
      activeServices,
    });
  } catch (e) {
    console.error("public settings error", e);
    // Non-fatal: the form falls back to its built-in defaults.
    return res.status(200).json({ companyPhone: "09138266715", companyEmail: "", activeServices: [] });
  }
}
