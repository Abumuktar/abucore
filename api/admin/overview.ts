import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../../server/mongodb.js";
import { requireAuth } from "../../server/auth.js";
import { toAdminProject } from "../../server/projects.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = await getDb();
    const docs = await db.collection("projects").find({}).toArray();
    const projects = docs.map(toAdminProject);

    const now = new Date();
    const activeStatuses = ["Pending", "In Progress", "On Hold"];

    const activeProjects = projects.filter((p) => activeStatuses.includes(p.status)).length;

    const totalContractValue = projects
      .filter((p) => p.status !== "Cancelled")
      .reduce((sum, p) => sum + (p.contractValue || 0), 0);

    const completedThisMonth = projects.filter((p) => {
      if (p.status !== "Completed") return false;
      const delivery = p.milestones.find((m) => m.key === "delivery");
      if (!delivery?.completedAt) return false;
      const d = new Date(delivery.completedAt as string);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;

    const unreadSubmissions = await db
      .collection("contactSubmissions")
      .countDocuments({ status: "New" });

    const activityDocs = await db
      .collection("activity")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    const recentActivity = activityDocs.map((a) => ({
      projectId: a.projectId,
      message: a.message,
      createdAt: a.createdAt,
    }));

    return res.status(200).json({
      activeProjects,
      totalContractValue,
      completedThisMonth,
      unreadSubmissions,
      totalProjects: projects.length,
      recentActivity,
    });
  } catch (e) {
    console.error("overview error", e);
    return res.status(500).json({ error: "Failed to load overview." });
  }
}
