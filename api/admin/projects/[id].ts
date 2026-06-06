import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getDb } from "../../../server/mongodb.js";
import { requireAuth } from "../../../server/auth.js";
import { toAdminProject, logActivity } from "../../../server/projects.js";

const patchSchema = z.object({
  clientName: z.string().trim().min(1).optional(),
  clientPhone: z.string().trim().min(1).optional(),
  clientEmail: z.string().trim().email().optional().or(z.literal("")),
  serviceType: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
  contractValue: z.coerce.number().nonnegative().optional(),
  startDate: z.string().min(1).optional(),
  expectedEndDate: z.string().min(1).optional(),
  internalNotes: z.string().optional().or(z.literal("")),
  manualStatus: z.enum(["On Hold", "Cancelled"]).nullable().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  const raw = req.query.id;
  const projectId = (Array.isArray(raw) ? raw[0] : raw || "").toString().trim().toUpperCase();
  if (!projectId) return res.status(400).json({ error: "Invalid project id" });

  try {
    const db = await getDb();
    const col = db.collection("projects");

    if (req.method === "GET") {
      const doc = await col.findOne({ projectId });
      if (!doc) return res.status(404).json({ error: "Project not found" });
      return res.status(200).json(toAdminProject(doc));
    }

    if (req.method === "PATCH") {
      const parsed = patchSchema.safeParse(req.body ?? {});
      if (!parsed.success) return res.status(400).json({ error: "Invalid changes." });
      const d = parsed.data;

      const existing = await col.findOne({ projectId });
      if (!existing) return res.status(404).json({ error: "Project not found" });

      const update: Record<string, unknown> = { updatedAt: new Date() };
      for (const k of [
        "clientName",
        "clientPhone",
        "clientEmail",
        "serviceType",
        "description",
        "contractValue",
        "internalNotes",
      ] as const) {
        if (d[k] !== undefined) update[k] = d[k];
      }
      if (d.startDate !== undefined) update.startDate = new Date(d.startDate);
      if (d.expectedEndDate !== undefined) update.expectedEndDate = new Date(d.expectedEndDate);
      if (d.manualStatus !== undefined) update.manualStatus = d.manualStatus;

      await col.updateOne({ projectId }, { $set: update });

      if (d.manualStatus !== undefined && d.manualStatus !== (existing.manualStatus ?? null)) {
        await logActivity(
          db,
          projectId,
          d.manualStatus ? `Status set to ${d.manualStatus}` : "Status returned to auto",
        );
      }

      const updated = await col.findOne({ projectId });
      return res.status(200).json(toAdminProject(updated));
    }

    if (req.method === "DELETE") {
      const result = await col.deleteOne({ projectId });
      if (result.deletedCount) await logActivity(db, projectId, "Project deleted");
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, PATCH, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("project detail error", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
