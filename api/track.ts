import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../server/mongodb.js";
import { toPublicProject } from "../server/projects.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.query.id;
  const id = (Array.isArray(raw) ? raw[0] : raw || "").toString().trim().toUpperCase();
  if (!id) return res.status(400).json({ error: "Please enter a valid Project ID" });

  try {
    const db = await getDb();
    const project = await db.collection("projects").findOne({ projectId: id });
    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found. Please check your ID and try again." });
    }
    return res.status(200).json(toPublicProject(project));
  } catch (e) {
    console.error("track error", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
