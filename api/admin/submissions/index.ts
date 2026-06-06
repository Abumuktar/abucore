import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../../server/mongodb.js";
import { requireAuth } from "../../../server/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = await getDb();
    const items = await db
      .collection("contactSubmissions")
      .find({})
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    const submissions = items.map((s) => ({
      id: String(s._id),
      name: s.name,
      email: s.email,
      phone: s.phone || "",
      serviceNeeded: s.serviceNeeded || "",
      message: s.message,
      status: s.status || "New",
      createdAt: s.createdAt,
    }));
    const unread = submissions.filter((s) => s.status === "New").length;

    return res.status(200).json({ submissions, unread });
  } catch (e) {
    console.error("submissions list error", e);
    return res.status(500).json({ error: "Failed to load submissions." });
  }
}
