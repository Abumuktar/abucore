import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getDb } from "../../../../server/mongodb";
import { requireAuth } from "../../../../server/auth";
import { toAdminProject, logActivity } from "../../../../server/projects";

const schema = z.object({
  key: z.enum(["contract_signed", "mobilization", "execution", "quality_check", "delivery"]),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;
  if (req.method !== "PATCH") {
    res.setHeader("Allow", "PATCH");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.query.id;
  const projectId = (Array.isArray(raw) ? raw[0] : raw || "").toString().trim().toUpperCase();
  const parsed = schema.safeParse(req.body ?? {});
  if (!projectId || !parsed.success) {
    return res.status(400).json({ error: "Invalid request." });
  }
  const { key } = parsed.data;

  try {
    const db = await getDb();
    const col = db.collection("projects");

    const project = await col.findOne({ projectId });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const milestone = (project.milestones || []).find((m: any) => m.key === key);
    if (!milestone) return res.status(400).json({ error: "Unknown milestone" });

    // Append-only: a completed milestone can't be undone.
    if (milestone.completed) {
      return res.status(200).json(toAdminProject(project));
    }

    await col.updateOne(
      { projectId, "milestones.key": key },
      {
        $set: {
          "milestones.$.completed": true,
          "milestones.$.completedAt": new Date(),
          updatedAt: new Date(),
        },
      },
    );
    await logActivity(db, projectId, `Marked "${milestone.name}" complete`);

    const updated = await col.findOne({ projectId });
    return res.status(200).json(toAdminProject(updated));
  } catch (e) {
    console.error("milestone update error", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
