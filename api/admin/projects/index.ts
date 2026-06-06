import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { getDb } from "../../../server/mongodb.js";
import { requireAuth } from "../../../server/auth.js";
import {
  freshMilestones,
  generateProjectId,
  toAdminProject,
  logActivity,
} from "../../../server/projects.js";

const createSchema = z.object({
  clientName: z.string().trim().min(1),
  clientPhone: z.string().trim().min(1),
  clientEmail: z.string().trim().email().optional().or(z.literal("")),
  serviceType: z.string().trim().min(1),
  description: z.string().trim().min(1),
  contractValue: z.coerce.number().nonnegative(),
  startDate: z.string().min(1),
  expectedEndDate: z.string().min(1),
  internalNotes: z.string().optional().or(z.literal("")),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  try {
    const db = await getDb();
    const col = db.collection("projects");

    if (req.method === "GET") {
      const docs = await col.find({}).sort({ createdAt: -1 }).limit(1000).toArray();
      const projects = docs.map((d) => {
        const p = toAdminProject(d);
        return {
          projectId: p.projectId,
          clientName: p.clientName,
          serviceType: p.serviceType,
          contractValue: p.contractValue,
          status: p.status,
          progress: p.progress,
          createdAt: p.createdAt,
        };
      });
      return res.status(200).json({ projects });
    }

    if (req.method === "POST") {
      const parsed = createSchema.safeParse(req.body ?? {});
      if (!parsed.success) {
        return res.status(400).json({ error: "Please fill in all required fields correctly." });
      }
      const d = parsed.data;
      const year = new Date().getFullYear();
      const projectId = await generateProjectId(db, year);
      const now = new Date();

      const doc = {
        projectId,
        clientName: d.clientName,
        clientPhone: d.clientPhone,
        clientEmail: d.clientEmail || "",
        serviceType: d.serviceType,
        description: d.description,
        contractValue: d.contractValue,
        startDate: new Date(d.startDate),
        expectedEndDate: new Date(d.expectedEndDate),
        internalNotes: d.internalNotes || "",
        manualStatus: null,
        milestones: freshMilestones(),
        createdAt: now,
        updatedAt: now,
      };
      await col.insertOne(doc);
      await logActivity(db, projectId, `Project created for ${d.clientName}`);
      return res.status(201).json(toAdminProject(doc));
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("projects index error", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
